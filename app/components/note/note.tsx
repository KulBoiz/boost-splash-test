import { observer } from "mobx-react-lite"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Image, Pressable, View } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../models"
import { color } from "../../theme"
import { AppText } from "../app-text/AppText"
import { Button } from "../button/button"
import FormInput from "../form-input/form-input"

interface Props {
  id?: any
  onFocus?: () => void
}

const Note = observer((props: Props) => {
  const { id, onFocus } = props
  // @ts-ignore
  const { commentStore } = useStores()
  const { comments } = commentStore
  const [reply, setReply] = useState("")

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    reValidateMode: "onChange" || "onTouched",
  })

  const {
    control: controlReply,
    getValues: getValuesReply,
    setValue: setValueReply,
    formState: { errors: errorsReply },
  } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    reValidateMode: "onChange" || "onTouched",
  })

  useEffect(() => {
    commentStore.get(id)
  }, [])

  const sendNote = (replyToId?: string) => {
    const body: any = {
      belongToId: id,
    }
    let bodyContent = ""

    if (replyToId) {
      const { content } = getValuesReply()
      body.replyToId = replyToId
      body.content = content
      bodyContent = content
    } else {
      const { content } = getValues()
      body.content = content
      bodyContent = content
    }

    if (!bodyContent && !bodyContent.trim()) {
      return
    }

    commentStore.post(body).then(() => {
      commentStore.get(id)
      setValue("content", "")
      setValueReply("content", "")
      setReply("")
    })
  }

  return (
    <View style={styles.noteItem}>
      {comments.map((comment: any, index) => (
        <View style={{ flexDirection: "row" }} key={index}>
          <Image
            style={[styles.image, View && { marginTop: 0 }]}
            source={{ uri: comment?.createdBy?.avatar }}
          />
          <View style={styles.noteContent}>
            <AppText style={styles.name} value={comment?.createdBy?.fullName} />
            <AppText style={styles.time} value={moment(comment?.createdAt).fromNow()} />
            <AppText style={styles.valueNote} value={comment?.content} />

            {comment?.reply &&
              comment?.reply?.map((subComment, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                  <Image
                    style={[styles.image, View && { marginTop: 0 }]}
                    source={{ uri: subComment?.createdBy?.avatar }}
                  />
                  <View style={styles.noteContent}>
                    <AppText style={styles.name} value={subComment?.createdBy?.fullName} />
                    <AppText style={styles.time} value={moment(subComment?.createdAt).fromNow()} />
                    <AppText style={styles.valueNote} value={subComment?.content} />
                  </View>
                </View>
              ))}

            {reply !== comment?.id && (
              <Pressable
                onPress={() => {
                  setReply(comment?.id)
                }}
              >
                <View style={styles.reply}>
                  <AppText style={styles.replyText} value={"Trả lời"} />
                </View>
              </Pressable>
            )}

            {reply === comment?.id && (
              <View style={{ width: "100%" }}>
                <FormInput
                  {...{
                    name: "content",
                    label: "Trả lời",
                    placeholder: "Ghi chú",
                    control: controlReply,
                    error: errorsReply?.email?.message,
                    style: { flex: 1 },
                    onFocus,
                  }}
                />

                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    onPress={() => {
                      setReply("")
                    }}
                    style={{ width: s(50), backgroundColor: color.palette.white }}
                  >
                    <AppText value={"Huỷ"} />
                  </Button>

                  <Button
                    onPress={() => {
                      sendNote(comment.id)
                    }}
                    style={{ width: s(80) }}
                  >
                    <AppText value={"Ghi chú"} style={{ color: color.palette.white }} />
                  </Button>
                </View>
              </View>
            )}
          </View>
        </View>
      ))}

      <View style={{ width: "100%" }}>
        <FormInput
          {...{
            name: "content",
            label: "Trả lời",
            placeholder: "Ghi chú",
            control,
            error: errors?.content?.message,
            style: { flex: 1 },
            returnKeyType: "done",
          }}
        />

        <Button
          onPress={() => {
            sendNote()
          }}
          style={{ width: s(80) }}
        >
          <AppText value={"Ghi chú"} style={{ color: color.palette.white }} />
        </Button>
      </View>
    </View>
  )
})

export default Note

const styles = ScaledSheet.create({
  note: {
    width: "100%",
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: "8@s",
    padding: "6@s",
  },
  noteItem: {
    flexDirection: "column",
    marginBottom: "24@s",
  },
  image: {
    width: "24@s",
    height: "24@s",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: color.palette.EEEEEE,
    marginTop: 0,
  },
  noteContent: {
    flexDirection: "row",
    width: "90%",
    flexWrap: "wrap",
    marginLeft: "8@s",
    marginBottom: "8@s",
  },
  name: {
    fontSize: 12,
  },
  time: {
    fontSize: 12,
    color: color.palette.BABABA,
    paddingLeft: "4@s",
  },
  valueNote: {
    color: "#151940",
    fontSize: 12,
    paddingTop: "4@s",
    paddingBottom: "4@s",
    width: "100%",
  },
  reply: {
    paddingBottom: "1@s",
    borderBottomWidth: 1,
    borderColor: color.palette.blue,
  },
  replyText: {
    color: color.palette.blue,
    fontSize: 12,
    opacity: 0.5,
  },
})
