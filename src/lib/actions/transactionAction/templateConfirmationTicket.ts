import { ResponseTransactionWithDiscount } from "@/types/transactionAction";

import { dateFormatter, hiddenTextFormatter, rupiahFormatter } from "@/utils";

export const templateTransactionTicket = (
  data: ResponseTransactionWithDiscount
) => {
  return `
    <main style="padding:0; margin:0;font-family: Arial, Helvetica, sans-serif;">
      <div style="background-color: #00bd71; padding: 2rem 1rem; margin-bottom: 2rem; color:white;">
          <h1 style="font-size: 1.5rem;text-align:center;">Konfirmasi Pembelian Tiket Kusuma Bloom</h1>
      </div>
      <div style="text-align: center; padding: 0 1rem;margin-bottom: 2rem;">
          <h3>Halo, ${data.user.name}</h3>
          <p style="font-weight: bold; color: #00bd71; margin-bottom: 1rem;">Pembelian tiket Anda telah kami terima</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/user/qr-code/${
    data.id
  }?from_email=1" target="_blank" rel="noopener noreferrer" style="display:block; width: 170px; padding: 15px; margin: 0 auto; background-color: #00bd71; color: white; text-decoration: none; border-radius: 5px; margin-bottom: 1rem;">Get QR Code</a>
          <small style="display:block;color: salmon;">*Klik link diatas untuk mendapatkan QR Code sebagai bukti pembelian tiket dari Kusuma
              Bloom</small>
          <p>Terima kasih telah membeli tiket dari Kusuma Bloom, kami berharap Anda puas</p>
      </div>
      <div style="background-color: #00bd71; margin-bottom: 2rem; color:white; padding: 1rem .5rem;">
          <table style="width: 100%; border: 0; border-collapse: collapse; font-size: .8rem;" border="0">
              <caption style="text-align: center; font-weight: bold; font-size: 1.2rem; margin-bottom: 1.2rem;">
                  Detail Pemesanan</caption>
              <thead>
                  <tr style="font-size: .8rem;">
                      <th style="padding-bottom: .5rem; text-align: start;">${dateFormatter(
                        data.created_at.toDateString()
                      )}</th>
                      <th style="padding-bottom: .5rem; text-align: end;">${hiddenTextFormatter(
                        data.id
                      )}</th>
                  </tr>
              </thead>
              <tbody>
                  <tr style="background-color: white; color: #1f1f1f;">
                      <td style=" text-align: start; padding: 1.2rem 0 .5rem 1rem;">Nama</td>
                      <td style=" text-align: end; padding: 1.2rem 1rem .5rem 0;">${
                        data.user.name
                      }</td>
                  </tr>
                  <tr style="background-color: white; color: #1f1f1f;">
                      <td style=" text-align: start; padding: .5rem 0 .5rem 1rem;">Email</td>
                      <td style=" text-align: end; padding: .5rem 1rem .5rem 0;">${
                        data.user.email
                      }</td>
                  </tr>
                  <tr style="background-color: white; color: #1f1f1f;">
                      <td style=" text-align: start; padding: .5rem 0 .5rem 1rem;">Status Pembayaran</td>
                      <td style=" text-align: end; padding: .5rem 1rem .5rem 0;">Berhasil</td>
                  </tr>
                  <tr style="background-color: white; color: #1f1f1f;">
                      <td style=" text-align: start; padding: .5rem 0 .5rem 1rem;">Tanggal Berlaku Tiket</td>
                      <td style=" text-align: end; padding: .5rem 1rem .5rem 0;">${dateFormatter(
                        data.expired.toDateString()
                      )}</td>
                  </tr>
                  <tr style="background-color: white; color: #1f1f1f;">
                      <td style=" text-align: start; padding: .5rem 0 .5rem 1rem;">Jumlah Tiket</td>
                      <td style=" text-align: end; padding: .5rem 1rem .5rem 0;">${
                        data.quantity
                      }</td>
                  </tr>
                  <tr style="background-color: white; color: #1f1f1f;">
                      <td style=" text-align: start; padding: .5rem 0 .5rem 1rem;">Harga Tiket</td>
                      <td style=" text-align: end; padding: .5rem 1rem .5rem 0;">${rupiahFormatter(
                        data.price
                      )}</td>
                  </tr>
                  ${
                    data.discountMember
                      ? `
                  <tr style="background-color: white; color: #1f1f1f; font-weight: 700;">
                  <td style=" text-align: start; padding: .5rem 0 .5rem 1rem;">Diskon Member</td>
                  <td style=" text-align: end; padding: .5rem 1rem .5rem 0;">${rupiahFormatter(
                    data.discountMember
                  )}</td>
              </tr>`
                      : ""
                  }
                  ${
                    data.discountVoucher
                      ? `
                  <tr style="background-color: white; color: #1f1f1f; font-weight: 700;">
                  <td style=" text-align: start; padding: .5rem 0 .5rem 1rem;">Diskon Voucher</td>
                  <td style=" text-align: end; padding: .5rem 1rem .5rem 0;">${rupiahFormatter(
                    data.discountVoucher
                  )}</td>
              </tr>`
                      : ""
                  }
            <tr style="background-color: white; color: #1f1f1f; font-weight: 700;">
            <td style=" text-align: start; padding: .5rem 0 .5rem 1rem;">Total</td>
            <td style=" text-align: end; padding: .5rem 1rem .5rem 0;">${rupiahFormatter(
              data.discountMember && data.discountVoucher
                ? data.gross_amount -
                    (data.discountMember + data.discountVoucher)
                : data.discountMember
                ? data.gross_amount - data.discountMember
                : data.discountVoucher
                ? data.gross_amount - data.discountVoucher
                : data.gross_amount
            )}</td>
        </tr>
              </tbody>
          </table>
      </div>
      <div style="padding: 0 1rem ;margin-bottom:2em">Jika kamu butuh bantuan harap hubungi pihak kami
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kusumabloomofficial@example.com&su=verification-email&body=ineedhelp&bcc=kusumabloomofficial.else@example.com"
              style="color: #00bd71;">disini</a>
      </div>
      <h5 style="text-align: center;">
          Powered By <span style="color: #00bd71;">Kusuma Bloom</span></h5>
  </main>`;
};
