import {blue400, blue300, blue200, blue100, grey900} from 'material-ui/styles/colors';
import spacing from 'material-ui/styles/spacing';
const desktopGutter = spacing.desktopGutter;

export const styles = {
  appBar: {
  position: 'fixed',
        // Needed to overlap the examples
        fontSize: 20,
        top: 0,
        background: blue300,
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
        color: blue300,
      },
    subheaderTitle: {
        fontSize: 14,
        fontWeight: 200,
        color: 'black',
      },
    text: {
        fontSize: 14,
        fontWeight: 200,
        color: 'black',
    },
    footer: {
      align: 'center',
      display: 'block',
      textAlign: 'center',
      paddingBottom: desktopGutter*2
    }

};
