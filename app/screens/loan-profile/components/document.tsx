import { flatten } from "lodash"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { CheckedSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import { numberWithCommas, truncateString } from "../../../constants/variable"
import { color } from "../../../theme"
import ItemView from "../../loan/components/item-view"
import CollapsibleInfoUpload from "./collapsible-info-upload"

interface Props {
  loanDetail?: any
  files?: any[]
  templates?: any[]
}

const Document = React.memo((props: Props) => {
  const { loanDetail, files, templates = [] } = props
  const [viewAllFile, setViewAllFile] = useState(false)

  useEffect(() => {
    if (templates.length > 4) setViewAllFile(false)
  }, [])

  const renderTemplate = () => {
    return flatten(templates?.map((el) => el?.documentTemplateDetails)).map((el) => {
      if (!files) {
        return el
      } else {
        if (files[el.documentId]) {
          const images = files[el.documentId].map((el) => el.file.url)
          return { ...el, images: images }
        }
        return el
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppText style={styles.title} value={"Thông tin khoản vay"} />
        <View style={styles.contentItem}>
          <ItemView
            style={styles.item}
            title={"loan.infoLoan.info.loanDemand"}
            content={truncateString(loanDetail?.product?.name, 20)}
          />
          <ItemView
            style={styles.item}
            title={"loan.infoLoan.info.collateral"}
            content={loanDetail?.realEstateInfo?.apartmentCode}
          />
          <ItemView
            style={styles.item}
            title={"loan.infoLoan.info.money"}
            content={loanDetail?.loanMoney ? `${numberWithCommas(loanDetail?.loanMoney)} VNĐ` : ""}
          />
          <ItemView
            style={styles.item}
            title={"loan.infoLoan.info.time"}
            content={loanDetail?.timeLoan ? `${loanDetail?.timeLoan} Năm` : ""}
          />
        </View>
      </View>

      {renderTemplate()?.length > 0 && (
        <View style={styles.content}>
          <AppText style={styles.title} value={"Giấy tờ của khách"} />
          {renderTemplate()?.map((el, index) => (
            <CollapsibleInfoUpload data={el} key={index} />
          ))}
          <View style={styles.contentItem}>
            {/* <CollapsibleInfoUpload data={renderTemplate()}/> */}
            {/* {renderTemplate().map((el: any, index: number) => */}
            {/*  <ItemView key={index.toString()} style={styles.item} title={el?.name} content={checkFileUpload(el)} /> */}
            {/* )} */}
            {/* {
              renderTemplate()?.length > 4 && <View style={styles.viewMore}>
                <AppText style={styles.viewMoreText} value={!viewAllFile ? 'Xem thêm' : "Ẩn"} onPress={() => { setViewAllFile(!viewAllFile) }} />
              </View>
            } */}
          </View>
        </View>
      )}
    </View>
  )
})

export default Document

const styles = ScaledSheet.create({
  container: {},
  content: {
    marginBottom: "16@s",
  },
  title: {
    marginBottom: "8@s",
  },
  contentItem: {
    borderRadius: "8@s",
    // padding: '8@s',
    backgroundColor: color.palette.white,
  },
  item: {
    padding: "8@s",
  },
  viewMore: {
    borderTopWidth: 1,
    borderTopColor: color.palette.EEEEEE,
    margin: "8@s",
  },
  viewMoreText: {
    paddingTop: "16@s",
    color: color.palette.blue,
    textAlign: "center",
  },
})
