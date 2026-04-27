import { prisma } from '@/common/lib/prisma';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    await prisma.task.delete({
      where: { id: id },
    });

    return NextResponse.json('Task deleted successfully');
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const PATCH = async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const { status, title, description } = body;

    // dynamic update object
    const updateData: any = {};

    if (status !== undefined) updateData.status = status;
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          error: 'No fields provided to update',
        },
        { status: 400 },
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
};
