import { images } from "../../assets/images"

export const REQUEST_PROFILE = [
  {
    title: '1. Pháp Lý',
    content: [
      'Giấy tờ tùy thân',
      'Sổ hộ khẩu / KT3',
      'Xác nhận hôn nhân'
    ]
  },
  {
    title: '2. nguồn thu',
    content: [
      'Hộ kinh doanh',
      'Lương',
      'Góp vốn công ty',
      'Cho thuê xe',
      'Cho thuê nhà / nhà trọ / khách sạn',
      'Nguồn thu khác'
    ]
  },
  {
    title: '3. phương án vay',
    content: [
      'Chứng từ thanh toán',
      'Hình ảnh',
      'Pháp lý giao dịch'
    ]
  },
  {
    title: '4. tài sản',
    content: [
      'Giấy tờ sở hữu',
      'Định giá',
      'Hình ảnh'
    ]
  },
  {
    title: '5. lịch sử tính dụng',
    content: [
      'CIC',
      'HĐTD / KUNN / sao kê trả nợ'
    ]
  },
  {
    title: '6. hồ sơ khác',
    content: [
      'Tài sản tích luỹ',
      'Hồ sơ phát sinh khác'
    ]
  },
]

export const LOAN_PROCESS = [
  {
    title: 'FINA tư vấn khả năng vay sơ bộ cho khách hàng và thu thập thông tin về:',
    content: [
      'Mục đích vay vốn',
      'Hồ sơ pháp lý',
      'Nguồn thu nhập',
      'Tài sản thế chấp'
    ]
  },{
    title: 'Chuyển hồ sơ đến NVNH qua hệ thống của FINA',
    content: [
      'Chuyên viên của FINA chuyển thông tin, hồ sơ khách hàng cho NVNH và tiếp tục theo dõi tiến trình hồ sơ của khách hàng. Chuyên viên tư vấn của FINA cùng hỗ trợ khách hàng trong quá trình xử lý hồ sơ vay tại ngân hàng.'
    ]
  },{
    title: 'Ngân hàng tiếp nhận thông tin và xử lý',
    content: [
      'NVNH nhận thông tin, tương tác tháo gỡ vướng mắc khó khăn và cập nhật hồ sơ trên hệ thống của FINA. Sau đó đánh giá, đề xuất tài trợ và thông báo kết quả phê duyệt cho khách hàng của FINA.'
    ]
  },{
    title: 'Ngân hàng tiếp nhận thông tin và xử lý',
    content: [
      'NVNH thông báo cho khách hàng các thủ tục cần thiết để giải ngân, khách hàng bổ sung hồ sơ theo điều kiện phê duyệt (nếu có). Thực hiện công chứng, thế chấp, ký HĐTD. Sau đó tiến hành giải ngân và cập nhật lên hệ thống của FINA.'
    ]
  },
]

export const FINANCE_FILTER = [
  {
    icon: images.house,
    title:'nhà đất'
  },{
    icon: images.car,
    title:'mua ô tô'
  },{
    icon: images.coin,
    title:'tái cấp vốn'
  },{
    icon: images.cube,
    title:'sản xuất kinh doanh'
  },
]

export const PROFILE_MANAGEMENT_FILTER = [
  {
    icon: images.cube,
    title:'tất cả'
  },{
    icon: images.clock,
    title:'chờ xử lý'
  },{
    icon: images.chart,
    title:'đang xử lý'
  },{
    icon: images.icon_x,
    title:'đóng'
  },
]

export const DEAL_STATUSES = {
  WAIT_PROCESSING: 'wait_processing',
  PROCESSING: 'processing',
  MOVED_TO_FINANCIAL_ORGANIZATION: 'moved_to_financial_organization',
  LEND_APPROVAL: 'lend_approval',
  DISBURSING: 'disbursing',
  TRIPARTITE_BLOCKADE: 'tripartite_blockade',
  DISBURSED: 'disbursed',
  CANCELLED: 'cancelled',
}

const DEAL_TEXT = {
  DISBURSED: 'Đã giải ngân',
  CANCELLED: 'Huỷ bỏ',
  WAIT_PROCESSING: 'Chờ xử lý',
  PROCESSING: 'Đang xử lý',
  DISBURSING: 'Đang giải ngân',
  TRIPARTITE_BLOCKADE: 'Phong toả 3 bên',
  MOVED_TO_FINANCIAL_ORGANIZATION: 'Đã chuyển đơn vị tài chính',
  LEND_APPROVAL: 'Duyệt giải ngân',
};

export const CheckStatus = status => {
  switch (status){
    case DEAL_STATUSES.WAIT_PROCESSING : {
      return {text : DEAL_TEXT.WAIT_PROCESSING, color: 'lime'}
    }
    case DEAL_STATUSES.PROCESSING : {
      return {text : DEAL_TEXT.PROCESSING, color: 'green'}
    }
    case DEAL_STATUSES.MOVED_TO_FINANCIAL_ORGANIZATION : {
      return {text : DEAL_TEXT.MOVED_TO_FINANCIAL_ORGANIZATION, color: 'cyan'}
    }
    case DEAL_STATUSES.LEND_APPROVAL : {
      return {text : DEAL_TEXT.LEND_APPROVAL, color: 'green'}
    }
    case DEAL_STATUSES.DISBURSED : {
      return {text : DEAL_TEXT.DISBURSED, color: 'blue'}
    }
    case DEAL_STATUSES.DISBURSING : {
      return {text : DEAL_TEXT.DISBURSING, color: '#1d39c4'}
    }
    case DEAL_STATUSES.TRIPARTITE_BLOCKADE : {
      return {text : DEAL_TEXT.TRIPARTITE_BLOCKADE, color: 'purple'}
    }
    case DEAL_STATUSES.CANCELLED : {
      return {text : DEAL_TEXT.CANCELLED, color: 'red'}
    }
    default:  return {text : DEAL_TEXT.WAIT_PROCESSING, color: 'lime'}
  }
}
