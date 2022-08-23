import { images } from "../../assets/images"
import { background } from "native-base/lib/typescript/theme/styled-system"
import { hexToRgbA } from "../../constants/variable"

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

const TASK_TEXT = {
  DISBURSED: 'Đã giải ngân',
  CANCELLED: 'Huỷ bỏ',
  WAIT_PROCESSING: 'Chờ xử lý',
  PROCESSING: 'Đang xử lý',
  DISBURSING: 'Đang giải ngân',
  TRIPARTITE_BLOCKADE: 'Phong toả 3 bên',
  MOVED_TO_FINANCIAL_ORGANIZATION: 'Đã chuyển đơn vị tài chính',
  LEND_APPROVAL: 'Duyệt giải ngân',
};

const TASK_STATUSES = {
  NEW: 'new',
	PROCESSING: 'processing',
	CANCEL: 'cancel',
	DONE: 'done',
	DELETED: 'deleted',
	CREATED: 'created',
	ASSIGNED: 'assigned',
	CONSULTED: 'consulted',
}

const TASK_STATUSES_ASSIGNED = {
	NOT_PROCESSING: 'not_processing', // chưa xủ lý
	PROCESSING: 'processing', // đang xử lý
	WAITING_FOR_BANK_APPROVAL: 'waiting_for_bank_approval', // chờ ngân hàng phản hồi,
	WAITING_FOR_BANK_PROCESS: 'waiting_for_bank_process', // chờ ngân hàng xử lý,
	BANK_APPROVAL: 'received', // ngân hàng phê duyệt,
	BANK_REJECT: 'reject',
	WAITING_FOR_STAFF_FINA: 'waiting_for_staff_fina',
	CREATE_PROFILE:'create_profile',
	OVERDUE_FOR_BANK_RESPONSE: 'overdue_for_bank_response',
};

export const mappingStatus = (value, doc) => {
  let status = '_';
  let color = 'lime';
  let background = hexToRgbA('#00ff00', 0.1);

		if (value === TASK_STATUSES.CREATED) {
      status = 'Ghi nhận'
      color = 'lime'
      background = hexToRgbA('#00ff00', 0.1)
		}

		if (value === TASK_STATUSES.DONE) {
      status = 'Đóng yêu cầu tư vấn'
      color = 'red'
      background = hexToRgbA('#ff0000', 0.1)
    }

  	if (value === TASK_STATUSES.ASSIGNED) {
      status = 'Thu thập thông tin'
      color = 'green'
      background = hexToRgbA('#008000', 0.1)
    }

    if (value === TASK_STATUSES.CONSULTED) {
      if (doc?.statusAssign === TASK_STATUSES_ASSIGNED.NOT_PROCESSING) {
        status = 'Đã gửi thư chào tín dụng'
        color = 'green'
        background = hexToRgbA('#008000', 0.1)

      }

      if (doc?.statusAssign === TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL) {
        status = 'Chờ đối tác phản hồi'
        color = 'yellow'
        background = hexToRgbA('#ffff00', 0.1)
      }

      if (doc?.statusAssign === TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS) {
        status = 'Có đối tác phản hồi'
        color = 'green'
        background = hexToRgbA('#008000', 0.1)
      }

      if (doc?.statusAssign === TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE) {
        status = 'Quá thời hạn phản hồi'
        color = 'red'
        background = hexToRgbA('#ff0000', 0.1)
      }

      if (doc?.statusAssign === TASK_STATUSES_ASSIGNED.CREATE_PROFILE) {
        status = 'Tạo hồ sơ vay'
        color = 'blue'
        background = hexToRgbA('#0000ff', 0.1)
      }
    }

		return {status, color, background};
};

export const TASK_FILTER = [
  {
    // icon: images.house,
    title: 'Tất cả',
    key: 0
  },
  {
    // icon: images.house,
    title: 'Ghi nhận',
    key: 1,
    status: TASK_STATUSES.CREATED,
  },{
    // icon: images.car,
    title: 'Thu thập thông tin',
    key: 2,
    status: TASK_STATUSES.ASSIGNED,
  },{
    // icon: images.coin,
    title: 'Đã gửi thư chào tín dụng',
    key: 3,
    status: TASK_STATUSES.CONSULTED,
    statusAssign: TASK_STATUSES_ASSIGNED.NOT_PROCESSING
  },{
    // icon: images.cube,
    title: 'Chờ đối tác phản hồi',
    key: 4,
    status: TASK_STATUSES.CONSULTED,
    statusAssign: TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL
  },{
    // icon: images.cube,
    title: 'Có đối tác phản hồi',
    key: 5,
    status: TASK_STATUSES.CONSULTED,
    statusAssign: TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS
  },{
    // icon: images.cube,
    title: 'Quá thời hạn phản hồi',
    key: 6,
    status: TASK_STATUSES.CONSULTED,
    statusAssign: TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE
  },{
    // icon: images.cube,
    title: 'Tạo hồ sơ vay',
    key: 7,
    status: TASK_STATUSES.CONSULTED,
    statusAssign: TASK_STATUSES_ASSIGNED.CREATE_PROFILE
  },
]

export const isTaskCreateProfile = (task) => {
  const { status, statusAssign } = task

  if (status === TASK_STATUSES.CONSULTED && statusAssign === TASK_STATUSES_ASSIGNED.CREATE_PROFILE) {
    return true
  }

  return false
}

export const PRODUCT_TYPE = {
  LOAN: 'loan',
  INSURANCE: 'insurances',
  INVESTMENT: 'investment',
  REAL_ESTATE: 'real_estate',
  BONDS: 'bonds',
};

export const PRODUCT_TYPES_OPTIONS = [
  {
    value: PRODUCT_TYPE.LOAN,
    label: 'Vay',
  },
  {
    value: PRODUCT_TYPE.INSURANCE,
    label: 'Bảo hiểm',
  },
  {
    value: PRODUCT_TYPE.REAL_ESTATE,
    label: 'Bất động sản',
  },
];

