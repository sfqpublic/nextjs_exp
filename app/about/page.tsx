// app/about/page.tsx

import React from 'react';
import RootLayout from '../root-layout';
export const metadata = {
    title: '关于我们 | 我的网站',
    description: '了解更多关于我们公司/项目的信息',
}
export default function AboutPage() {
    return (
        <RootLayout footerProps={{ page: 'about' }}>
        <div>
            <h1>关于我们</h1>
            <p>欢迎来到关于页面。这里是我们公司/项目的简介。</p>
            <section>
                <h2>我们的使命</h2>
                <p>我们致力于提供最优质的服务/产品，为客户创造价值。</p>
            </section>
            <section>
                <h2>我们的团队</h2>
                <p>我们拥有一支充满激情和创造力的团队，他们来自各个领域，为公司/项目带来多元化的视角和专业知识。</p>
            </section>
            <section>
                <h2>联系我们</h2>
                <p>邮箱：info@example.com</p>
                <p>电话：123-456-7890</p>
                <p>地址：某某市某某街道123号</p>
            </section>
        </div>
        </RootLayout>
    );
}