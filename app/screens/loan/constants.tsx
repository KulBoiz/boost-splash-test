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

		if (value === TASK_STATUSES.CREATED) {
      status = 'Ghi nhận'
      color = 'lime'
		}

		if (value === TASK_STATUSES.DONE) {
      status = 'Đóng yêu cầu tư vấn'
      color = 'red'
		}

		if (value === TASK_STATUSES.CONSULTED) {
      status = 'Chờ khách hàng phản hồi'
      color = 'green'
		}

		if (value === TASK_STATUSES.ASSIGNED
			&& (doc?.statusAssign === TASK_STATUSES_ASSIGNED.NOT_PROCESSING || !doc?.statusAssign)) {
      status = 'Thu thập thông tin'
      color = 'green'
		}

		if (value === TASK_STATUSES.ASSIGNED
			&& doc?.statusAssign === TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL) {
      status = 'Chờ phản hồi của đối tác'
      color = 'green'
		}

		if (value === TASK_STATUSES.ASSIGNED
			&& doc?.statusAssign === TASK_STATUSES_ASSIGNED.BANK_APPROVAL) {
      status = 'Đối tác đang xử lý'
      color = 'green'
		}

		if (value === TASK_STATUSES.ASSIGNED
			&& doc?.statusAssign === TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS) {
      status = 'Đối tác đang xử lý'
      color = 'blue'
		}

		if (value === TASK_STATUSES.CONSULTED) {
      status = 'Chờ khách hàng phản hồi'
      color = 'blue'
		}

		if (doc?.statusAssign === TASK_STATUSES_ASSIGNED.WAITING_FOR_STAFF_FINA) {
      status = 'Chờ phản hồi của nhân viên Fina'
      color = 'blue'
		}

		if (doc?.statusAssign === TASK_STATUSES_ASSIGNED.CREATE_PROFILE) {
			status = 'Tạo hồ sơ vay'
      color = 'blue'
		}

		if (doc?.statusAssign === TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE && doc?.status === TASK_STATUSES.ASSIGNED) {
			status = 'Quá hạn chia sẻ'
      color = 'red'
		}

		return {status, color};
	};

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

