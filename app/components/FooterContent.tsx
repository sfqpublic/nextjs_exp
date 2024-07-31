// app/components/FooterContent.tsx

import React from 'react';

export interface FooterContentProps {
    page?: string;
    // 可以添加更多props，比如用户状态、主题等
}

export default function FooterContent({ page = 'default' }: FooterContentProps) {
    const currentYear = new Date().getFullYear();

    const getPageSpecificContent = () => {
        switch (page) {
            case 'home':
                return <p>欢迎来到我们的主页！</p>;
            case 'about':
                return <p>了解更多关于我们的信息。</p>;
            default:
                return null;
        }
    };

    return (
        <div>
            {getPageSpecificContent()}
            <p>© {currentYear} 我的网站. 保留所有权利。</p>
            <nav>
                <a href="/terms" style={{ marginRight: '1rem' }}>服务条款</a>
                <a href="/privacy">隐私政策</a>
            </nav>
        </div>
    );
}