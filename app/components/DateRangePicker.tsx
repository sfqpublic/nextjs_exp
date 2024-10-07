import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const { RangePicker } = DatePicker;
interface DateRangePickerComponentProps {
    onDateRangeChange?: (dates: any) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({ onDateRangeChange }) => {
    const [dateRange, setDateRange] = useState<any[]>([]);

    const handleDateRangeChange = (dates: any, dateStrings: string[]) => {
        setDateRange(dates);
        // console.log('From: ', dates[0], ', to: ', dates[1]);
        // console.log(onDateRangeChange);
        // debugger;
        if (onDateRangeChange) {
            onDateRangeChange(dates);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">选择日期范围</h2>
            <Space direction="vertical" size={12}>
                <RangePicker
                    onChange={handleDateRangeChange}
                    className="w-full"
                />
            </Space>
            {dateRange.length > 0 && (
                <div className="mt-4">
                    <p>开始日期: {dateRange[0].format('YYYY-MM-DD')}</p>
                    <p>结束日期: {dateRange[1].format('YYYY-MM-DD')}</p>
                </div>
            )}
        </div>
    );
};
// DateRangePickerComponent.propTypes = {
//     onDateRangeChange: PropTypes.func
// };
export default DateRangePickerComponent;