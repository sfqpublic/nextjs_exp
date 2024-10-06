import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ExcelRow {
    TYPE: string;
    SE_BID: number;
    BN_BID: number;
    SE_ASK: number;
    BN_ASK: number;
    BOC_CONV: number;
    Time: number; // Excel stores dates as numbers
}

interface ChartData {
    Time: Date;
    // SE_BID: number;
    // BN_BID: number;
    // SE_ASK: number;
    // BN_ASK: number;
    BOC_CONV: number;
}

const ExcelChart: React.FC = () => {
    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // 假设Excel文件在public文件夹中
            const response = await fetch('/(USD)SE_BID+BN_BID+SE_ASK+BN_ASK+BOC_CONV_2010-1-1_2024-10-05.xlsx');
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // 使用 raw: true 选项来获取原始的数值数据
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true }) as ExcelRow[];
            console.log(jsonData);
            // 过滤数据
            // 处理数据以适应图表格式，并只保留10:30的记录
            const formattedData: ChartData[] = jsonData
                .filter(row => {
                    // 将 Excel 的日期数值转换为 JavaScript 日期对象
                    const excelDate = XLSX.SSF.parse_date_code(row.Time);
                    // debugger;
                    // 过滤掉不是10:30的记录
                    return excelDate.H === 10 && excelDate.M === 30;
                })
                .map(row => {
                    const excelDate = XLSX.SSF.parse_date_code(row.Time);
                    const result = excelDate;
                    const jsDate = new Date(result.y, result.m - 1, result.d, result.H, result.M, result.S);

                    return {
                        Time: jsDate,
                        // SE_BID: row.SE_BID,
                        // BN_BID: row.BN_BID,
                        // SE_ASK: row.SE_ASK,
                        // BN_ASK: row.BN_ASK,
                        BOC_CONV: row.BOC_CONV
                    };
                });

            setData(formattedData);
            console.log(formattedData);
            console.log('Filtered and formatted data:', formattedData);
        } catch (error) {
            console.error('Error fetching or processing Excel data:', error);
        }
    };

    const saveFilteredExcel = () => {
        if (data.length === 0) {
            console.error('No data to save');
            alert('No data to save. Please ensure the Excel file contains valid data.');
            return;
        }

        // 创建一个新的工作簿
        const newWorkbook = XLSX.utils.book_new();
        // 将过滤后的数据转换为工作表
        const newWorksheet = XLSX.utils.json_to_sheet(data);
        // 将工作表添加到工作簿
        XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "FilteredData");

        // 生成二进制字符串
        const excelBuffer = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });

        // 创建Blob
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // 创建下载链接并触发下载
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'filtered_data.xlsx';
        link.click();

        // 清理
        window.URL.revokeObjectURL(url);
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* <Line type="monotone" dataKey="SE_BID" stroke="#8884d8" />
                    <Line type="monotone" dataKey="BN_BID" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="SE_ASK" stroke="#ffc658" />
                    <Line type="monotone" dataKey="BN_ASK" stroke="#ff7300" /> */}
                    <Line type="monotone" dataKey="BOC_CONV" stroke="#00C49F" />
                </LineChart>
            </ResponsiveContainer>
            <button onClick={saveFilteredExcel}>保存过滤后的Excel</button>
        </div>
    );
};

export default ExcelChart;