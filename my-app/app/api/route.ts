import { NextResponse } from 'next/server';
import { getMessages } from 'next-intl/server';

export async function GET(request: Request) {
  const messages = await getMessages();
  return NextResponse.json(messages);
}