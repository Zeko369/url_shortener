import React from "react"
import QRCode from "qrcode.react"

export interface QrCodeProps {
  data: string
  emojiUrl?: string
  showEmoji?: boolean
  aspect?: number
  invert: boolean
}

export const QrCode: React.FC<QrCodeProps> = ({ data, invert, showEmoji, emojiUrl, aspect }) => {
  return (
    <div id="qr">
      <QRCode
        value={data}
        size={400}
        level="H"
        includeMargin
        bgColor={invert ? "#000" : "#fff"}
        fgColor={!invert ? "#000" : "#fff"}
        imageSettings={
          showEmoji
            ? {
                src: emojiUrl,
                x: null,
                y: null,
                height: 60,
                width: 60 * (aspect || 1),
                excavate: true,
              }
            : undefined
        }
      />
    </div>
  )
}
