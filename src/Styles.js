import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue500, blue400, blue300, blue200, blue100, grey900} from 'material-ui/styles/colors';
import spacing from 'material-ui/styles/spacing';
const desktopGutter = spacing.desktopGutter;

const colors = {
 main: blue500,
}

export const muiTheme = getMuiTheme({
  palette: {
    
  },
  color: {
    main: colors.main,
  },
  appBar: {
    position: 'fixed',
        // Needed to overlap the examples
        fontSize: 20,
        top: 0,
        background: colors.main,
        paddingLeft: 100,
        paddingTop: 0,
        paddingBottom: 0,
  },
  brushMarks: {
  fontSize: 10, color: 'black',
  },
  tab: {
        // Needed to overlap the examples
        fontSize: 14,
        backgroundColor: colors.main,
        tapHighlightColor: grey900,
  },
  progress: {
    color: colors.main,
  },
  drawer: {
    // Needed to overlap the examples
    top: 0,
    background: 'white',
    zIndex: 2,
  },
  menuItemTop: {
    paddingTop: desktopGutter * 3,
    zIndex: 100,
    fontSize: 14,
        fontWeight: 200,
  },
  menuItem: {
    zIndex: 100,
    fontSize: 14,
        fontWeight: 200,
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
  },
  content: {
        maxWidth: 1200,
        padding: 0,
        margin: '0 auto',
        fontSize: 14,
        fontWeight: 200,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
      },
    card: {
        zIndex: 1
      },
    toolbar: {
      padding: 16,
      background: blue100,
    },
    headerTitleInverse: {
        fontSize: 20,
        fontWeight: 200,
        color: 'white',
      },
    headerTitle: {
        fontSize: 20,
        fontWeight: 200,
        color: colors.main,
        paddingBottom: desktopGutter*0.1
      },
    subheaderTitle: {
        fontSize: 14,
        fontWeight: 200,
        color: 'white',
        backgroundColor: colors.main,
      },
    text: {
        fontSize: 14,
        fontWeight: 200,
        color: 'black',
        lineHeight: '200%',
    },
    footer: {
      align: 'center',
      display: 'block',
      textAlign: 'center',
      paddingBottom: desktopGutter*2
    }
});
