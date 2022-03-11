import {Dimensions} from "react-native";

const logoPanelHeight = Math.round(Dimensions.get('window').height * 0.25);

export default {
  logoPanel: {
    height: logoPanelHeight,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  },

  btn: {
    backgroundColor: "#FBB943",
    color: "#fff",
    marginTop: 20,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    display: "flex",
    padding: 20,
  },
  btnText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 17,
    fontFamily: "exo"

  }
}
