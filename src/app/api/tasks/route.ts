import { prisma } from '@/common/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(tasks);
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log('Body:', body);
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        status: 'pending',
      },
    });
    return NextResponse.json(task);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
