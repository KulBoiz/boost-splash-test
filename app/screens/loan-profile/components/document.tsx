import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { CheckedSvg } from '../../../assets/svgs';
import { AppText } from "../../../components/app-text/AppText";
import { truncateString } from '../../../constants/variable';
import { color } from "../../../theme";
import ItemView from '../../loan/components/item-view';

interface Props {
  loanDetail?: any,
  files?: any[],
  templates?: any[],
}

const Document = React.memo((props: Props) => {
  const { loanDetail, files, templates = [] } = props
  const [viewAllFile, setViewAllFile] = useState(false)

  useEffect(() => {
    if (templates.length > 4) setViewAllFile(false)
  }, [])
  console.log('templates', templates)
  const renderTemplate = () => {
    const list = [...templates] || []
    if (viewAllFile) {
      return list
    } else {
      return list.slice(0, 4)
    }
  }

  const checkFileUpload = (document: any) => {
    if (!files) return "_"

    const documentTemplateDetails = document?.documentTemplateDetails?.map(el => el?.documentId);

    let count = 0
    documentTemplateDetails.forEach(documentId => {
      const file = files[documentId]
      if (file) count = count + 1
    })

    if (count === documentTemplateDetails.length) {
      return <CheckedSvg />
    }

    return "_"
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppText style={styles.title} value={"Thông tin khoản vay"} />
        <View style={styles.contentItem}>
          <ItemView style={styles.item} title={"loan.infoLoan.info.loanDemand"} content={truncateString(loanDetail?.product?.name, 20)} />
          <ItemView style={styles.item} title={"loan.infoLoan.info.collateral"} content={loanDetail?.realEstateInfo?.apartmentCode} />
          <ItemView style={styles.item} title={"loan.infoLoan.info.money"} content={loanDetail?.loanMoney ? `${loanDetail?.loanMoney?.toLocaleString()} VNĐ` : ''} />
          <ItemView style={styles.item} title={"loan.infoLoan.info.time"} content={loanDetail?.timeLoan ? `${loanDetail?.timeLoan} Năm` : ''} />
        </View>
      </View>

      {
        templates?.length > 0 && <View style={styles.content}>
          <AppText style={styles.title} value={"Giấy tờ của khách"} />
          <View style={styles.contentItem}>
            {renderTemplate().map((el: any, index: number) =>
              <ItemView key={index.toString()} style={styles.item} title={el?.name} content={checkFileUpload(el)} />
            )}
            {
              templates?.length > 4 && <View style={styles.viewMore}>
                <AppText style={styles.viewMoreText} value={!viewAllFile ? 'Xem thêm' : "Ẩn"} onPress={() => { setViewAllFile(!viewAllFile) }} />
              </View>
            }
          </View>
        </View>
      }

    </View>
  )
});

export default Document;

const styles = ScaledSheet.create({
  container: {
  },
  content: {
    marginBottom: '16@s'
  },
  title: {
    marginBottom: '8@s'
  },
  contentItem: {
    borderRadius: '8@s',
    padding: '8@s',
    backgroundColor: color.palette.white,
  },
  item: {
    padding: '8@s',
  },
  viewMore: {
    borderTopWidth: 1,
    borderTopColor: color.palette.EEEEEE,
    margin: '8@s',
  },
  viewMoreText: {
    paddingTop: '16@s',
    color: color.palette.blue,
    textAlign: 'center'
  }
});
