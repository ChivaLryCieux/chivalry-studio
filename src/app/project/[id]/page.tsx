import React from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProjectDetail({ params }: PageProps) {
    const resolvedParams = await params;
    const projectId = Number(resolvedParams.id);
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
        notFound();
    }

    // 强制样式对象
    const wrapperStyle: React.CSSProperties = {
        width: '72vw', // 🔴 强制宽度
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)', // 主页同款阴影
        backgroundColor: '#3e1c1c',
        borderRadius: '4px',
        overflow: 'hidden', // 核心：溢出隐藏，切断超出的图片
        position: 'relative', // 确保子元素定位准确
        aspectRatio: '16 / 9', // 锁定比例
        flexShrink: 0, // 防止被 Flex 布局压缩
    };

    return (
        <main style={{
            minHeight: '100vh',
            width: '100%',
            overflowX: 'hidden',
            backgroundColor: '#3e1c1c',
            color: '#ede8de'
        }}>

            {/* 导航栏 */}
            <nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    paddingLeft: '2vw',
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 50,
                    mixBlendMode: 'difference',
                    color: 'white',

                }}
            >
                <Link href="/" className="text-xl font-bold tracking-widest pointer-events-auto">
                    WORKS
                </Link>
            </nav>

            {/* 内容区域 Flex 布局 */}
            <div style={{
                paddingTop: '50px',
                paddingBottom: '80px',
                paddingLeft: '2vw', // 左侧留白
                paddingRight: '5vw',
                display: 'flex',
                flexDirection: 'row', // 强制横向
                gap: '8vw',
                alignItems: 'flex-start',
                width: '100%'
            }}>

                {/* --- 左侧：图片区域 --- */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                    {/* 主图 */}
                    <div style={wrapperStyle}>
                        <img
                            src={project.src}
                            alt={project.title}
                            style={{
                                width: '100%', // 🔴 必须填满父容器 (600px)
                                height: '100%', // 填满高度
                                objectFit: 'cover', // 裁剪适应
                                display: 'block' // 防止底部空隙
                            }}
                        />
                        {/* 黑色遮罩 */}
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)', pointerEvents: 'none' }} />
                    </div>

                    {/* 详情图列表 */}
                    {project.detailImages && project.detailImages.length > 0 && (
                        project.detailImages.map((imgSrc, idx) => (
                            <div key={idx} style={wrapperStyle}>
                                <img
                                    src={imgSrc}
                                    alt={`Detail ${idx}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)', pointerEvents: 'none' }} />
                            </div>
                        ))
                    )}
                </div>

                {/* --- 右侧：文字区域 --- */}
                <div style={{ flex: 1, minWidth: '15vw' }}>
                    <div style={{ position: 'sticky', top: '120px', maxWidth: '15vw' }}>

                        {/* 标题 */}
                        <div className="border-b border-gray-200 pb-6 mb-8">
                            <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-widest">
                                0{project.id} / {project.category}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                                {project.title || "Untitled"}
                            </h1>
                        </div>

                        {/* 信息 */}
                        <br></br>
                        <div className="space-y-6 text-sm md:text-base">
                            <p><strong>YEAR:</strong> {project.year}</p>
                            <p><strong>DESC:</strong> {project.description || "Coming soon."}</p>
                            {project.content && <p><strong>DETAILS:</strong> {project.content}</p>}
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}