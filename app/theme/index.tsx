import { theme } from "@chakra-ui/core"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...theme,
  icons: {
    ...theme.icons,
    qrcode: {
      // The <path/> or <g> element for the svg. Note the use of  `fill=currentColor`
      path: (
        <>
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <g>
              <path fill="currentColor" d="M3,11h8V3H3V11z M5,5h4v4H5V5z" />
              <path fill="currentColor" d="M3,21h8v-8H3V21z M5,15h4v4H5V15z" />
              <path fill="currentColor" d="M13,3v8h8V3H13z M19,9h-4V5h4V9z" />
              <rect fill="currentColor" height="2" width="2" x="19" y="19" />
              <rect fill="currentColor" height="2" width="2" x="13" y="13" />
              <rect fill="currentColor" height="2" width="2" x="15" y="15" />
              <rect fill="currentColor" height="2" width="2" x="13" y="17" />
              <rect fill="currentColor" height="2" width="2" x="15" y="19" />
              <rect fill="currentColor" height="2" width="2" x="17" y="17" />
              <rect fill="currentColor" height="2" width="2" x="17" y="13" />
              <rect fill="currentColor" height="2" width="2" x="19" y="15" />
            </g>
          </g>
        </>
      ),
      viewBox: "0 0 24 24",
    },
  },
}
