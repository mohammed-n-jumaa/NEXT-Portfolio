import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const MESSAGES_FILE = path.join(process.cwd(), 'src/data/messages.json');

// Ensure messages file exists
function ensureMessagesFile() {
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    ensureMessagesFile();
    
    // Read existing messages
    const fileContents = fs.readFileSync(MESSAGES_FILE, 'utf8');
    const messages: ContactMessage[] = JSON.parse(fileContents);
    
    // Create new message
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Add to messages array
    messages.unshift(newMessage);
    
    // Write back to file
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    
    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    ensureMessagesFile();
    
    const fileContents = fs.readFileSync(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(fileContents);
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error reading messages:', error);
    return NextResponse.json(
      { error: 'Failed to load messages' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { messageId, action } = await request.json();
    
    ensureMessagesFile();
    
    const fileContents = fs.readFileSync(MESSAGES_FILE, 'utf8');
    const messages: ContactMessage[] = JSON.parse(fileContents);
    
    if (action === 'markAsRead') {
      const messageIndex = messages.findIndex(msg => msg.id === messageId);
      if (messageIndex !== -1) {
        messages[messageIndex].read = true;
      }
    } else if (action === 'delete') {
      const messageIndex = messages.findIndex(msg => msg.id === messageId);
      if (messageIndex !== -1) {
        messages.splice(messageIndex, 1);
      }
    }
    
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}