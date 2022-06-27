import moment from "moment"
import numeral from "numeral"
import { find } from "../../utils/lodash-utils"
export const GET_TASK_STATUS_ASSIGNED = {
  not_processing: "Chưa xử lý", // chưa xủ lý
  processing: "Đang xử lý", // đang xử lý
  waiting_for_bank_approval: "Đã tiếp nhận", // chờ ngân hàng phản hồi,
  waiting_for_bank_process: "Chờ tiếp nhận", // chờ ngân hàng xử lý,
  bank_approval: "Đã phê duyệt", // ngân hàng phê duyệt,
  bank_reject: "Đã từ chối",
  waiting_for_staff_fina: "Chờ tiếp nhận",
  create_profile: "Tạo hồ sơ vay",
  overdue_for_bank_response: "Quá thời hạn phản hồi",
}

export const GET_STATUS_BANK_FEED_BACK = {
  waiting_to_receive: "Chờ xử lý",
  received: "Tiếp nhận",
  reject: "Từ chối",
  enough_people_to_accept: "Đã đủ người tiếp nhận",
  // responded: "Đã phản hồi",
}

export const STATUS_BANK_FEED_BACK = {
  waiting_to_receive: "waiting_to_receive",
  received: "received",
  reject: "reject",
  enough_people_to_accept: "enough_people_to_accept",
  // responded: "Đã phản hồi",
}

export const LOAN_STATUS_TYPES = {
  ALL: "all",
  WAIT_PROCESSING: "wait_processing", // Chờ xử lý
  RECEIVED: "received", // tiếp nhận
  APPRAISAL_PROGRESS: "appraisal_progress", // thẩm định
  LEND_APPROVAL: "lend_approval",
  TRIPARTITE_BLOCKADE: "tripartite_blockade",
  DISBURSING: "disbursing",
  DISBURSED: "disbursed",
  CANCELLED: "cancelled",
}

export const DEAL_STATUS = [
  { key: "moved_to_financial_organization", text: "Chờ xử lý" },
  { key: LOAN_STATUS_TYPES.RECEIVED, text: "Tiếp nhận" },
  { key: LOAN_STATUS_TYPES.APPRAISAL_PROGRESS, text: "Thẩm định" },
  { key: LOAN_STATUS_TYPES.LEND_APPROVAL, text: "Duyệt cho vay" },
  { key: LOAN_STATUS_TYPES.TRIPARTITE_BLOCKADE, text: "Phong tỏa 3 bên" },
  { key: LOAN_STATUS_TYPES.DISBURSING, text: "Đang giải ngân" },
  { key: LOAN_STATUS_TYPES.DISBURSED, text: "Đã giải ngân" },
  { key: LOAN_STATUS_TYPES.CANCELLED, text: "Huỷ bỏ" },
]
export const TRANSACTION_STATUS_TYPES = {
  FOR_CONTROL: "for_control",
  NOT_FOR_CONTROL: "not_for_control",
  CANCELLED: "cancelled",
}

export const LOAN_STEP_INDEX = {
  [LOAN_STATUS_TYPES.WAIT_PROCESSING]: 0, // Chờ xử lý
  [LOAN_STATUS_TYPES.RECEIVED]: 1, // Tiếp nhận
  [LOAN_STATUS_TYPES.APPRAISAL_PROGRESS]: 2, // Thẩm định
  [LOAN_STATUS_TYPES.LEND_APPROVAL]: 3, // duyệt cho vay
  [LOAN_STATUS_TYPES.TRIPARTITE_BLOCKADE]: 4, // phong toả 3 bên
  [LOAN_STATUS_TYPES.DISBURSING]: 5, // Đang giải ngân
  [LOAN_STATUS_TYPES.DISBURSED]: 6, // Đã giải ngân
}

export const LOAN_STATUS = [
  { key: "wait_processing", text: "Chờ xử lý" },
  { key: LOAN_STATUS_TYPES.RECEIVED, text: "Tiếp nhận" },
  { key: LOAN_STATUS_TYPES.APPRAISAL_PROGRESS, text: "Thẩm định" },
  { key: LOAN_STATUS_TYPES.LEND_APPROVAL, text: "Duyệt cho vay" },
  { key: LOAN_STATUS_TYPES.TRIPARTITE_BLOCKADE, text: "Phong tỏa 3 bên" },
  { key: LOAN_STATUS_TYPES.DISBURSING, text: "Đang giải ngân" },
  { key: LOAN_STATUS_TYPES.DISBURSED, text: "Đã giải ngân" },
  { key: LOAN_STATUS_TYPES.CANCELLED, text: "Huỷ bỏ" },
]

export const LOAN_STATUS_DATA = [
  { key: LOAN_STATUS_TYPES.ALL, text: "Tất cả" },
  { key: LOAN_STATUS_TYPES.WAIT_PROCESSING, text: "Hồ sơ chờ duyệt" },
  { key: LOAN_STATUS_TYPES.LEND_APPROVAL, text: "Duyệt cho vay" },
  { key: LOAN_STATUS_TYPES.TRIPARTITE_BLOCKADE, text: "Phong tỏa 3 bên" },
  { key: LOAN_STATUS_TYPES.DISBURSING, text: "Đang giải ngân" },
  { key: LOAN_STATUS_TYPES.DISBURSED, text: "Đã giải ngân" },
  { key: LOAN_STATUS_TYPES.CANCELLED, text: "Huỷ bỏ" },
]

export const REQUEST_STATUS_TYPES = {
  DEAL_PROCESSING_TASK: "deal_processing_task",
  WAITING_TO_RECEIVE: "waiting_to_receive",
  RECEIVED: "received",
  REJECT: "reject",
}

export const REQUEST_STATUS_DATA = [
  { key: REQUEST_STATUS_TYPES.DEAL_PROCESSING_TASK, text: "Tất cả" },
  { key: REQUEST_STATUS_TYPES.WAITING_TO_RECEIVE, text: "Chờ xử lý" },
  { key: REQUEST_STATUS_TYPES.RECEIVED, text: "Tiếp nhận" },
  { key: REQUEST_STATUS_TYPES.REJECT, text: "Từ chối" },
]

export const GENDER = {
  male: "Nam",
  female: "Nữ",
}

export const QUESTION_TYPES = {
  // SINGLE_CHOICE: 'SC',
  // MULTIPLE_CHOICE_SINGLE_ANSWER: 'MCSA',
  // MULTIPLE_CHOICE_MULTIPLE_ANSWER: 'MCMA',
  OPEN_ENDED: "OPEN_ENDED",
  OPEN_ENDED_NUMBER: "OPEN_ENDED_NUMBER",
  REORDER: "REORDER",
  IMAGE_SELECTION: "IMAGE_SELECTION",
  TEXT_SELECTION: "TEXT_SELECTION",
  DATE: "DATE",
  // YES_NO: 'Y/N',
  // FILL_IN: 'fill_in',
  // REORDER: 'reorder',
  // PAIRING: 'pairing',
  // DROPPING: 'dropping',
}

export const getSurveyName = (surveyDetails: any) => {
  return find(surveyDetails, (i) => i.questionData?.code === "QUESTION_LPC_NAME")?.content
}

export const getSurveyDetails = (surveyDetails: any) => {
  return surveyDetails.map((el) => {
    const questionData: any = el?.questionData || {}
    const type = el?.type

    switch (type) {
      case QUESTION_TYPES.IMAGE_SELECTION:
        return {
          label: questionData?.content?.blocks?.[0]?.text,
          value: el?.content,
        }
      case QUESTION_TYPES.DATE:
        return {
          label: questionData?.content?.blocks?.[0]?.text,
          value: moment(el?.content).format("DD / MM / YYYY | hh:mm"),
        }
      case QUESTION_TYPES.OPEN_ENDED:
        return {
          label: questionData?.content?.blocks?.[0]?.text,
          value: el?.content,
        }
      case QUESTION_TYPES.OPEN_ENDED_NUMBER:
        return {
          label: questionData?.content?.blocks?.[0]?.text,
          value: numeral(el?.content).format("0,0") + " " + questionData?.suffix,
        }
      case QUESTION_TYPES.TEXT_SELECTION:
        return {
          label: questionData?.content?.blocks?.[0]?.text,
          value: el?.selectedOptions?.[0]?.content,
        }
      case QUESTION_TYPES.REORDER:
        return {
          label: questionData?.content?.blocks?.[0]?.text,
          value: el?.content,
        }
      default: {
        return questionData
      }
    }
  })
}
