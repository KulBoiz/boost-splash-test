import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Pressable, View } from 'react-native';
import { s, ScaledSheet } from "react-native-size-matters";
import { useStores } from '../../models';
import { color } from "../../theme";
import { AppText } from "../app-text/AppText";
import { Button } from "../button/button";
import FormInput from '../form-input/form-input';

interface Props {
  id?: any
}

const Note = observer((props: Props) => {
  const { id } = props
  // @ts-ignore
  const { commentStore } = useStores()
  const { comments } = commentStore
  const [visable, setVisible] = useState(false)

  const { control, handleSubmit, getValues, formState: { errors } } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    reValidateMode: "onChange" || "onTouched",
  })

  useEffect(() => {
    commentStore.get(id)
  }, [])

  console.log('comments 1', comments);
  

  const sendNote = () => {
    // TODO:
    const { content } = getValues()

    console.log('content', content);

    if (content.trim()) {
      // todo
    }
  }

  return (
    <View style={styles.noteItem}>
      {
        comments.map((comment: any, index) => (
          <View style={{ flexDirection: 'row' }} key={index}>
            <Image
              style={[styles.image, View && { marginTop: 0 }]}
              source={{ uri: comment?.createdBy?.avatar }}
            />
            <View style={styles.noteContent}>
              <AppText style={styles.name} value={comment?.createdBy?.fullName} />
              <AppText style={styles.time} value={moment(comment?.createdAt).fromNow()} />
              <AppText style={styles.valueNote} value={comment?.content} />
              {
                !visable &&
                <Pressable onPress={() => {
                  // TODO:
                  setVisible(true)
                }}>
                  <View style={styles.reply}>
                    <AppText style={styles.replyText} value={'Trả lời'} />
                  </View>
                </Pressable>
              }
              {visable &&
                <View style={{ width: '100%' }}>
                  <FormInput
                    {...{
                      name: 'note',
                      label: 'Trả lời',
                      placeholder: 'Ghi chú',
                      control,
                      error: errors?.email?.message,
                      style: { flex: 1 }
                    }}
                  />

                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button onPress={() => { setVisible(false) }} style={{ width: s(50), backgroundColor: color.palette.white }}>
                      <AppText value={'Huỷ'} />
                    </Button>

                    <Button onPress={sendNote} style={{ width: s(80) }}>
                      <AppText value={'Ghi chú'} style={{ color: color.palette.white }} />
                    </Button>
                  </View>
                </View>}
            </View>
          </View>
        ))
      }

      <View style={{ width: '100%' }}>
        <FormInput
          {...{
            name: 'content',
            label: 'Trả lời',
            placeholder: 'Ghi chú',
            control,
            error: errors?.email?.message,
            style: { flex: 1 }
          }}
        />

        <Button onPress={sendNote} style={{ width: s(80) }}>
          <AppText value={'Ghi chú'} style={{ color: color.palette.white }} />
        </Button>
      </View>
    </View>
  )
});

export default Note;

const styles = ScaledSheet.create({
  note: {
    width: '100%',
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: '8@s',
    padding: '6@s',
  },
  noteItem: {
    flexDirection: 'column',
    marginBottom: '24@s'
  },
  image: {
    width: '24@s',
    height: '24@s',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: color.palette.EEEEEE,
    marginTop: 0,
  },
  noteContent: {
    flexDirection: 'row',
    width: '90%',
    flexWrap: 'wrap',
    marginLeft: '8@s'
  },
  name: {
    fontSize: 12,
  },
  time: {
    fontSize: 12,
    color: color.palette.BABABA,
    paddingLeft: '4@s',
  },
  valueNote: {
    color: '#151940',
    fontSize: 12,
    paddingTop: '4@s',
    paddingBottom: '4@s',
    width: '100%'
  },
  reply: {
    paddingBottom: '1@s',
    borderBottomWidth: 1,
    borderColor: color.palette.blue
  },
  replyText: {
    color: color.palette.blue,
    fontSize: 12,
    opacity: 0.5
  }
});
