'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'myadmin123';
  if (password === adminPassword) {
    (await cookies()).set('admin_session', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 3600, sameSite: 'strict' });
    return { success: true };
  }
  return { success: false, error: 'Invalid password' };
}

export async function logout() {
  (await cookies()).delete('admin_session');
  revalidatePath('/');
}

export async function createProject(formData: FormData) {
  const session = (await cookies()).get('admin_session');
  if (!session || session.value !== 'true') throw new Error('Unauthorized');

  await prisma.project.create({
    data: {
      title: formData.get('title') as string,
      objective: formData.get('objective') as string,
      content: formData.get('content') as string,
      role: formData.get('role') as string,
      techStack: formData.get('techStack') as string,
      troubleshooting: formData.get('troubleshooting') as string,
      solution: formData.get('solution') as string,
      achievements: formData.get('achievements') as string,
      architecture: (formData.get('architecture') as string) || null,
      contribution: parseInt(formData.get('contribution') as string, 10),
      imageUrl: (formData.get('imageUrl') as string) || null,
      isFeatured: formData.get('isFeatured') === 'on',
      sortOrder: parseInt(formData.get('sortOrder') as string, 10) || 0,
    },
  });
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateProject(id: number, formData: FormData) {
  const session = (await cookies()).get('admin_session');
  if (!session || session.value !== 'true') throw new Error('Unauthorized');

  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get('title') as string,
      objective: formData.get('objective') as string,
      content: formData.get('content') as string,
      role: formData.get('role') as string,
      techStack: formData.get('techStack') as string,
      troubleshooting: formData.get('troubleshooting') as string,
      solution: formData.get('solution') as string,
      achievements: formData.get('achievements') as string,
      architecture: (formData.get('architecture') as string) || null,
      contribution: parseInt(formData.get('contribution') as string, 10),
      imageUrl: (formData.get('imageUrl') as string) || null,
      isFeatured: formData.get('isFeatured') === 'on',
      sortOrder: parseInt(formData.get('sortOrder') as string, 10) || 0,
    },
  });
  
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteProject(id: number) {
  const session = (await cookies()).get('admin_session');
  if (!session || session.value !== 'true') throw new Error('Unauthorized');

  await prisma.project.delete({ where: { id } });
  
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function toggleFeaturedAction(id: number, currentStatus: boolean) {
  try {
    await prisma.project.update({
      where: { id },
      data: { isFeatured: !currentStatus }
    });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update featured status' };
  }
}

export async function saveAboutMe(formData: FormData) {
  const session = (await cookies()).get('admin_session');
  if (!session || session.value !== 'true') throw new Error('Unauthorized');

  const data = {
    name: (formData.get('name') as string) || 'Anonymous',
    emails: (formData.get('emails') as string) || '[]',
    snsLinks: (formData.get('snsLinks') as string) || '[]',
    educations: (formData.get('educations') as string) || '[]',
    certifications: (formData.get('certifications') as string) || '[]',
    careers: (formData.get('careers') as string) || '[]',
  };

  await prisma.aboutMe.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data }
  });
  
  revalidatePath('/');
  revalidatePath('/admin');
}
