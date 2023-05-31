import React from 'react';

import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

export const options = [
  //Chi tiêu hàng tháng
  { value: '1', label: 'Ăn uống' },
  { value: '2', label: 'Di chuyển' },
  { value: '3', label: 'Thuê nhà' },
  { value: '4', label: 'Tiền nước' },
  { value: '5', label: 'Tiền điện thoại' },
  //Chi tiêu cần thiết
  { value: '11', label: 'Sửa và trang trí nhà' },
  { value: '12', label: 'Bảo dưỡng xe' },  
  { value: '13', label: 'Khám sức khoẻ' },
  { value: '14', label: 'Bảo hiểm' },
  { value: '15', label: 'Giáo dục' },
  //Vui-chơi
  { value: '18', label: 'Thú cưng' },
  { value: '19', label: 'Dịch vụ và gia đình' },
  { value: '20', label: 'Chi phí khác' },
  //Đầu tư, cho vay & nợ
  { value: '21', label: 'Đầu tư' },
  //Khoản thu
  { value: '36', label: 'Thu nhập khác' },

  //Khác
  { value: '40', label: 'Nhóm mới' },
];

const SpendingData = ({ spending }) => {
  
  
  return (
    <div className='pl-3' style={{ paddingLeft: '1rem' }}>
      <div className="card" style={{ width: '90%' }}>
      <div className="card-body">
        <p className="card-text" style={{ display: 'flex', flexDirection: 'column' }}>
          <p className="card-text" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            {spending.money} VND
          </span>
          <span style={{ fontSize: '1.1rem' }}>
            Time: {spending.date.toDate().toLocaleTimeString()}
          </span>
            <span style={{ display: 'flex', justifyContent: 'flex-end', width: '50%' }}>
              <IconButton aria-label="add">
                <CreateIcon />
              </IconButton>
              <IconButton aria-label="delete" color="error">
                <DeleteIcon />
              </IconButton>
            </span>
          </p>
          <hr />
          <span style={{ display: 'flex', justifyContent: 'space-between', marginRight: 100 }}>
            <span>Location: {spending.location}</span>
            <span>Friends: {spending.friends}</span>
            <span>Type: {spending.type}</span>
            <span>Note: {spending.note}</span>
          </span>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SpendingData;

