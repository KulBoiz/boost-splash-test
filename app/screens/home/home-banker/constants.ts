import moment from "moment";
import { numberWithCommas } from "../../../constants/variable";

export const QUESTION_TYPES = {
	// SINGLE_CHOICE: 'SC',
	// MULTIPLE_CHOICE_SINGLE_ANSWER: 'MCSA',
	// MULTIPLE_CHOICE_MULTIPLE_ANSWER: 'MCMA',
	OPEN_ENDED: 'OPEN_ENDED',
	OPEN_ENDED_NUMBER: 'OPEN_ENDED_NUMBER',
	REORDER: 'REORDER',
	IMAGE_SELECTION: 'IMAGE_SELECTION',
	TEXT_SELECTION: 'TEXT_SELECTION',
	DATE: 'DATE',
	// YES_NO: 'Y/N',
	// FILL_IN: 'fill_in',
	// REORDER: 'reorder',
	// PAIRING: 'pairing',
	// DROPPING: 'dropping',
};

export const fullDateTimeConverter = (dateString: string) => {
	const dateWithMoment = moment(dateString);
	return dateWithMoment.format('DD/MM/YYYY, h:mm:ss a');
}

export const SurveyResultBase = (surveyDetails: any) => {

	return surveyDetails.map((el) => {
		const questionData: any = el?.questionData || {};
		const type = el?.type;

		switch (type) {
			case QUESTION_TYPES.IMAGE_SELECTION:
				return {
					label: questionData?.content?.blocks?.[0]?.text,
					value: el?.content,
					suffix: questionData?.suffix
				}
			case QUESTION_TYPES.DATE:
				return {
					label: questionData?.content?.blocks?.[0]?.text,
					value: fullDateTimeConverter(el?.content),
					suffix: questionData?.suffix
				}
			case QUESTION_TYPES.OPEN_ENDED:
				return {
					label: questionData?.content?.blocks?.[0]?.text,
					value: el?.content,
					suffix: questionData?.suffix
				}
			case QUESTION_TYPES.OPEN_ENDED_NUMBER:
				return {
					label: questionData?.content?.blocks?.[0]?.text,
					value: numberWithCommas(el?.content),
					suffix: questionData?.suffix
				}
			case QUESTION_TYPES.TEXT_SELECTION:
				return {
					label: questionData?.content?.blocks?.[0]?.text,
					value: el?.selectedOptions?.[0]?.content,
					suffix: questionData?.suffix
				}
			case QUESTION_TYPES.REORDER:
				return {
					label: questionData?.content?.blocks?.[0]?.text,
					value: el?.content,
					suffix: questionData?.suffix
				}
			default: {
				return questionData
			}
		}
	})
};	