import moment from "moment"

export const CHECK_CONTENT = [
  'CMND / CCCD / Hộ chiếu rõ ràng và đầy đủ thông tin',
  'CMND / CCCD / Hộ chiếu bạn dùng phải là giấy tờ gốc',
  'CMND/ CCCD/ Hộ chiếu không phải là bản photocopy/ photoshop/ bản chụp qua các màn hình thiết bị điện tử khác',
  'CMND/ CCCD/ Hộ chiếu không bị bôi bẩn, nhàu nát, gấp gãy',
  'CMND/ CCCD/ Hộ chiếu của bạn đã được xác thực trước đó',
]

interface Props{
  day?:string,
  month?:string,
  year?:string,
  fullName?:string,
  idNumber?:string,
  issuedOn?:string,
  placeOfIssue?:string,
  address?:string,
  email?:string,
  tel?:string,
  bankAccount?:string,
  bankName?:string,
  currentUser?:any
}
export const CollaboratorContractInfoDesktop = (props: Props) => {
  const {

    day,
    month,
    year,
    fullName,
    idNumber,
    issuedOn,
    placeOfIssue,
    address,
    email,
    tel,
    bankAccount,
    bankName,
  } = props;
  return {
    html:
      `
    <b>
      <div style="display: flex; textAlign: center; fontFamily: Arial; fontWeight: bold">
        <div style="flexGrow: 1; marginBottom: 20px">
        <div>CÔNG TY CỔ PHẦN DỊCH VỤ TÀI</div>
        <div>CHÍNH BẤT ĐỘNG SẢN TULIP</div>
        </div>
       
        <div style="flexGrow: 1; marginBottom: 5px">
        <div>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div>Độc lập - Tự do - Hạnh phúc</div>
        <div>~~~~~</div>
        </div>
      </div>
    </b>
    <p
      style="marginTop: 0pt; marginBottom: 0pt; textAlign: right; widows: 0; orphans: 0; fontSize: 11pt">
      <span style={{fontFamily: 'Arial', fontStyle: 'italic'}}>
                Tp. Hồ Chí Minh, ngày ${day || moment().date()} tháng ${month || moment().month() + 1} năm ${year ||  moment().year()}
      </span>
      <span style={{fontFamily: 'Arial', fontStyle: 'italic'}}></span>
      </p>
      <h2 style="textAlign: center; marginTop: 20px">
      <b>HỢP ĐỒNG CỘNG TÁC VIÊN</b>
      </h2>
      <p style="lineHeight: 20px">
        Hợp Đồng Cộng Tác Viên này (gọi tắt là “Hợp Đồng”) được lập và có hiệu lực từ ngày 
      ${day || moment().date()} tháng ${month || moment().month() + 1} năm ${year ||  moment().year()} (“Ngày Hiệu Lực”) giữa Các Bên dưới
        đây:
      </p>
      <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
        <b>
          <span style={{ width: '7rem', display: 'inline-block' }}>CÔNG TY</span>: CÔNG TY CỔ PHẦN
          DỊCH VỤ TÀI CHÍNH BẤT ĐỘNG SẢN TULIP${' '}
        </b>
      </div>
      <div style="marginTop: 0.4rem">
        <span style={{ width: '7rem', display: 'inline-block' }}>- Mã số thuế</span>: 0316008661
      </div>
      <div style="marginTop: 0.4rem; lineHeight: 20px">
        <span style={{ width: '7rem', display: 'inline-block' }}>- Địa chỉ trụ sở</span>: L17-11, Tầng 17, Vincom Center Đồng Khởi, 72 Lê Thánh Tôn, P.Bến Nghé, Quận 1, TP. Hồ Chí Minh
      </div>
      <div style="marginTop: 0.4rem">
        <span style={{ width: '7rem', display: 'inline-block' }}>- Người đại diện</span>
        <b style={{ width: '12rem', display: 'inline-block' }}>: PHẠM ANH KHÔI</b>
      </div>
      <div style="marginTop: 0.4rem">
        <span style={{ width: '7rem', display: 'inline-block' }}>- Chức vụ</span>: Tổng Giám đốc
      </div>
      <div style="marginTop: 0.4rem">
        <span style={{ width: '7rem', display: 'inline-block' }}>- Email</span>
        <span style={{ width: '12rem', display: 'inline-block' }}>: ceo@fina.com.vn</span>
      </div>
      <div style="marginTop: 0.4rem">
         <span style={{ width: '7rem', display: 'inline-block' }}>- Số điện thoại</span>: 0857498668
      </div>
      <div style="marginTop: 0.4rem">
        <span style={{ width: '7rem', display: 'inline-block' }}>- Số Tài khoản</span>
        <span style={{ width: '12rem', display: 'inline-block' }}>: 111002804377 </span>
      </div>
      <div style="marginTop: 0.4rem;marginBottom: 0.4rem">
       <span style={{ width: '7rem', display: 'inline-block' }}>- Ngân hàng </span>
        <span style={{ width: '12rem', display: 'inline-block' }}>: Vietinbank CN4 </span>
      </div>
      <span style="marginTop: 0.8rem; marginBottom: 0.4rem">(gọi tắt là “TULIP”)</span>
    </br>
      <div>
        <b>
          <span style={{ width: '7rem', display: 'inline-block' }}>VÀ CÁ NHÂN</span>:${' '}
          ${fullName || '__________________________'}
        </b>
      </div>
      <div style="marginTop: 0.4rem">
				<span
          style={{
            width: '12rem',
            display: 'inline-block',
          }}
        >
					- CMND/CCCD/Hộ chiếu số
				</span>
        : ${idNumber || '__________________________'}
      </div>
      <div style="marginTop: 0.4rem">
        <span style={{ width: '7rem', display: 'inline-block' }}>- Ngày cấp</span>:${' '}
        <span style={{ width: '7rem', display: 'inline-block' }}>
					${issuedOn || '_____________'}
				</span>
      </div>
      <div style="marginTop: 0.4rem">
          - Nơi cấp: ${placeOfIssue || '_____________'}
      </div>
      <div style="marginTop: 0.4rem">
        <span style={{ width: '7rem', display: 'inline-block' }}>- Địa chỉ</span>:${' '}
        ${address || '_____________'}
      </div>
      <div style="marginTop: 0.4rem">
        <span style={{ width: '7rem', display: 'inline-block' }}>- Email</span>:${' '}
        <span style={{ width: '15rem', display: 'inline-block' }}>${email || '_____________'}</span>
      </div>
      <div style="marginTop: 0.4rem">
      - Số điện thoại: ${tel || '_____________'}
      </div>
      <div style="marginTop: 0.4rem; marginBottom: 0.4rem">
        <span style={{ width: '7rem', display: 'inline-block' }}>- Số Tài khoản</span>:${' '}
        <span style={{ width: '15rem', display: 'inline-block' }}>
					${bankAccount || '_____________'}
				</span>
      </div>
      <div>
         - Ngân hàng: ${bankName || '_____________'}
      </div>
      <span style="marginTop: 0.4rem">(Dùng cho việc nhận hoa hồng)</span>
<p style="lineHeight: 20px">
        Cộng Tác Viên và TULIP trong Hợp Đồng này khi gọi riêng là “Bên” và gọi chung là “Các Bên”.
</p>
<div style={{textAlign: 'center', textDecoration: 'underline'}}>
<b>XÉT RẰNG</b>
</div>
<div style="display: flex; marginBottom: 5px">
<div style="lineHeight: 20px">
        A.  TULIP là đơn vị sở hữu hợp pháp và cung cấp nền tảng công nghệ (“Nền tảng”) nhằm kết nối, giới thiệu và trung
          gian cung ứng các sản phẩm dịch vụ của (các) bên đối tác (“Đối Tác”) đến với khách hàng cá nhân, tổ chức
          (“Khách Hàng”). Theo đó, TULIP mong muốn gia tăng số lượng Khách Hàng và phát triển Nền tảng hoạt động một
          cách hiệu quả.
</div>
</div>
<div style={{display: 'flex', marginBottom: '5px'}}>
<div style="lineHeight: 20px">
        B.  Cộng Tác Viên có đủ khả năng và mối quan hệ để thực hiện các công việc nhằm làm đa dạng hóa hệ thống dữ liệu
          trên Nền tảng, thúc đẩy và kết nối Đối Tác của TULIP với Khách Hàng có nhu cầu, giúp Nền tảng phát huy được
          giá trị kinh doanh trong mối quan hệ với Đối Tác.
</div>
</div>
<div style={{display: 'flex', marginBottom: '5px'}}>
<div style="lineHeight: 20px">
        C.  TULIP và Cộng Tác Viên cùng đồng ý hợp tác dựa trên thế mạnh, khả năng và nguyện vọng của Các Bên theo các
          điều khoản, điều kiện nêu tại Hợp Đồng này.
</div>
</div>
<div style="marginBottom:5px; lineHeight: 20px">
<b>DO VẬY,</b> Các Bên đồng ý ký kết Hợp Đồng với các điều khoản như sau:
</div>
<div style="marginBottom: 5px; marginTop: 10px">
<b>
<span style="display: inline-block; width: 25px">I. </span> KHÁI QUÁT NỘI DUNG
          DỊCH VỤ
</b>
</div>
<table>
<tbody>
<tr>
<td
style="
border: 1px solid #000000;
padding: 0in 0.08in;
width: 25%;
textAlign: center;
"
>
<p>
<strong>
<span>Điều khoản</span>
</strong>
</p>
</td>
<td style="border: 1px solid #000000; padding: 0in 0.08in; textAlign: center">
<p>
<strong>
<span>Nội dung</span>
</strong>
</p>
</td>
</tr>
<tr>
<td
style="
border: 1px solid #000000;
padding: 0in 0.08in;
width: 25%;
textAlign: center;
"
>
<p>
<span>Phạm vi công việc</span>
</p>
<p>
<span>(Dịch Vụ)</span>
</p>
</td>
<td style="border: 1px solid #000000; padding: 0in 0.08in">
<p>
<span>Cộng Tác Viên sẽ thực hiện các công việc sau cho TULIP:</span>
</p>
<div>
<ol style="paddingLeft: 13px">
<li>
<span>
1. Cug cấp dữ liệu Khách Hàng bằng cách đăng tải, đưa thông tin của Khách Hàng có nhu cầu sử dụng các sản phẩm, dịch vụ của Đối Tác (“Sản Phẩm”) lên Nền tảng, nhằm làm đa đạng hóa hệ thống dữ liệu và mở rộng mạng lưới Khách Hàng tiếp cận với Sản Phẩm của Đối Tác trên Nền tảng.
</span>
</li>
<li>
<span>
2. Triển khai các hoạt động truyền thông, quảng bá giới thiệu Sản Phẩm, thương hiệu (qua nhiều hình thức đa dạng như: trực tuyến, trực tiếp) của TULIP và/hoặc bên Đối Tác của TULIP.
</span>
</li>
<li>
<span>
3. Kết nối, môi giới, giới thiệu Khách Hàng với các Sản Phẩm trên Nền tảng nhằm đẩy mạnh hiệu quả hoạt động của TULIP trong mối quan hệ với Đối Tác.
</span>
</li>
<li>
<span>
4. Là trung gian cung cấp và hướng dẫn Khách Hàng chuẩn bị các tài liệu/văn bản theo hướng dẫn của TULIP/nhân viên của TULIP/từ Đối Tác của TULIP.
</span>
</li>
</ol>
</div>
</td>
</tr>
<tr>
<td
style="
border: 1px solid #000000;
padding: 0in 0.08in;
width: 25%;
textAlign: center;
"
>
<p>
<span>Giao Dịch Thành Công</span>
</p>
</td>
<td style="border: 1px solid #000000; padding: 0in 0.08in">
<p>
<span>
Là giao dịch được xác nhận và hoàn tất trên Nền tảng khi Khách Hàng xác nhận sử dụng Sản Phẩm trên hệ thống theo dõi giao dịch của TULIP. Giao Dịch Thành Công sẽ được xác nhận bởi TULIP và/hoặc bên Đối Tác.
</span>
</p>
</td>
</tr>
<tr>
<td
style="
border: 1px solid #000000;
padding: 0in 0.08in;
width: 25%;
textAlign: center;
"
>
<p>
<span>KPI</span>
</p>
</td>
<td style="border: 1px solid #000000; padding: 0in 0.08in">
<p>
<span>
Theo chính sách của TULIP tùy từng thời điểm, chi tiết KPI sẽ được phân bổ cho
Cộng Tác Viên theo thông báo bằng văn bản.
</span>
</p>
<p>
<span>Cộng Tác Viên nỗ lực để hoàn thành KPI được đặt ra bởi TULIP.</span>
</p>
</td>
</tr>
<tr>
<td
style="
border: 1px solid #000000;
padding: 0in 0.08in;
width: 25%;
textAlign: center;
"
>
<p>
<span>Thù lao</span>
</p>
</td>
<td style="border: 1px solid #000000; padding: 0in 0.08in">
<p>
<span>
Theo chính sách của TULIP tùy từng thời điểm dựa trên KPI và Giao Dịch Thành Công
</span>
</p>
<p>
<em>
<span>(Thù lao đã bao gồm Thuế thu nhập cá nhân) </span>
</em>
</p>
</td>
</tr>
<tr>
<td
style="
border: 1px solid #000000;
padding: 0in 0.08in;
width: 25%;
textAlign: center;
"
>
<p>
<span>Thời hạn thanh toán thù lao</span>
</p>
</td>
<td style="border: 1px solid #000000; padding: 0in 0.08in">
<p>
<span>
Sau khi chốt KPI và Giao Dịch Thành Công. Chi tiết theo chính sách của TULIP tùy
từng thời điểm.
</span>
</p>
</td>
</tr>
<tr>
<td
style="
border: 1px solid #000000;
padding: 0in 0.08in;
width: 25%;
textAlign: center
"
>
<p>
<span>Hiệu lực của Hợp Đồng</span>
</p>
</td>
<td style="border: 1px solid #000000; padding: 0in 0.08in">
<p>
<span>Hợp Đồng có hiệu lực kể từ ngày đề tại phần đầu của Hợp Đồng.</span>
</p>
</td>
</tr>
</tbody>
</table>
<div style="marginBottom: 5px; marginTop: 10px">
<b>
<span style="display: inline-block; width: 25px">II. </span> NỘI DUNG CHI TIẾT HỢP
          ĐỒNG
</b>
</div>
<div style={{marginBottom: '5px'}}>
<strong>
<span style={{display: 'inline-block', width: '25px'}}>1. </span>Thực hiện Hợp Đồng
</strong>
</div>
<ol className="decimal_type" style={{paddingLeft: '0px'}}>
<ol style={{paddingLeft: '0px', listStyle: 'none'}}>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>1.1</span>
<span style="width: fit-content; lineHeight: 20px">
Cho mục đích thực hiện Hợp Đồng này, TULIP sẽ thiết lập quy trình khai thác, vận hành, cung cấp cho Cộng Tác Viên các công cụ, thông tin về Sản Phẩm để Cộng Tác Viên thực hiện công việc theo Hợp Đồng.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>1.2</span>
<span style={{width: 'fit-content'}}>
Cộng Tác Viên tiến hành đăng ký làm thành viên trên Nền tảng của TULIP.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>1.3</span>
<span style={{width: 'fit-content'}}>
Cộng Tác Viên cam kết thực hiện Hợp Đồng này theo đúng nội dung đã thỏa thuận hoặc nội dung được điều chỉnh một cách hợp lý của TULIP tùy từng thời điểm nhằm đáp bảo việc thực hiện Dịch Vụ được hiệu quả như thiện chí ban đầu giữa Các Bên.
</span>
</li>
</ol>
</ol>
<div style={{marginBottom: '5px'}}>
<strong>
<span>
<span style={{display: 'inline-block', width: '25px'}}>2. </span>Thanh toán Thù lao
</span>
</strong>
</div>
<ol className="decimal_type" style={{paddingLeft: '0px'}}>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>2.1</span>

<span style="width: fit-content">
Cộng Tác Viên được hưởng Thù lao như nêu tại Mục I. Khái quát nội dung dịch vụ của Hợp Đồng này.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>2.2</span>

<span style={{width: 'fit-content'}}>
Trừ trường hợp có sự thỏa thuận khác giữa Các Bên, Thù lao là khoản tiền duy nhất mà TULIP phải thanh toán cho Cộng Tác Viên theo Hợp Đồng này.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>2.3</span>
<span style={{width: 'fit-content'}}>
Phương thức thanh toán: Tiền mặt hoặc Chuyển khoản vào Tài khoản ngân hàng của Cộng Tác Viên theo thông tin tại phần đầu Hợp Đồng.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>2.4</span>

<span style={{width: 'fit-content'}}>
Thời hạn thanh toán: Theo chính sách của TULIP tùy từng thời điểm.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>2.5</span>
<span style={{width: 'fit-content'}}>Đồng tiền thanh toán: Việt Nam Đồng.</span>
</li>
</ol>

<div style={{marginBottom: '5px'}}>
<strong>
<span>
<span style={{display: 'inline-block', width: '25px'}}>3. </span>Trách nhiệm của Các
Bên
</span>
</strong>
</div>
<ol style={{paddingLeft: '0px'}}>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>3.1</span>
<span style={{width: 'fit-content'}}>
Trách nhiệm của Cộng Tác Viên
<ol style={{listStyleType: 'lower-roman'}}>
<li>
<span>
Cung cấp Dịch Vụ một cách chuyên nghiệp. Khi cung cấp Dịch Vụ, Cộng Tác Viên sẽ: (i) dành sự quan tâm hợp lý và áp dụng các kỹ năng chuyên nghiệp; (ii) hành động phù hợp với pháp luật Việt Nam và (iii) tuân thủ Chính sách bán hàng, Chính sách dịch vụ của TULIP/Đối Tác của TULIP.
</span>
</li>
<li>
<span>
Bảo quản các tài liệu được giao để thực hiện Dịch Vụ và phải hoàn trả cho TULIP sau khi hoàn thành công việc (nếu có).
</span>
</li>
<li>
<span>
Cộng Tác Viên cam kết đảm bảo rằng Khách Hàng biết và đồng ý về việc Cộng Tác Viên sẽ cung cấp thông tin của Khách Hàng lên Nền tảng của TULIP và miễn trừ cho TULIP nếu xảy ra bất kỳ khiếu nại, khiếu kiện nào phát sinh từ hoặc liên quan đến việc đăng thông tin Khách Hàng lên Nền tảng khi không được sự đồng ý của Khách Hàng.
</span>
</li>
<li>
<span>
Cam kết bảo mật tất cả các thông tin nhận được từ TULIP và không sử dụng các thông tin này cho bất kỳ mục đích nào ngoài mục đích thực hiện Hợp Đồng này cho bất kỳ bên thứ ba nào khi chưa được sự đồng ý bằng văn bản của TULIP. Trường hợp vi phạm điều khoản này, Cộng Tác Viên chịu phạt vi phạm tương ứng 5.000.000 đồng cho mỗi lần vi phạm và bồi thường thiệt hại thực tế xảy ra. Trừ trường hợp, thông tin đó là những thông tin (i) đã được phổ biến và công khai, hoặc (ii) phải tiết lộ cho các cơ quan Nhà nước có thẩm quyền theo quy định của pháp luật.
</span>
<p>
<span>
Điều khoản này sẽ vẫn tiếp tục có hiệu lực ngay cả khi Hợp Đồng bị chấm dứt.</span>
</p>
</li>
<li>
<span>
Các quyền và nghĩa vụ khác theo quy định Hợp Đồng và quy định pháp luật.</span>
</li>
</ol>
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>3.2</span>

<span style={{width: 'fit-content'}}>
Trách nhiệm của TULIP
<ol style={{listStyleType: 'lower-roman'}}>
<li>
<span>
Xây dựng, phát triển và vận hành Nền tảng. Đảm bảo Nền tảng vận hành bình thường, ổn định, an toàn, bảo mật thông tin và có khả năng tiếp nhận khối lượng thông tin lớn, đa dạng.
</span>
</li>
<li>
<span>Hỗ trợ Cộng tác Viên trong việc sử dụng Nền tảng do TULIP phát triển.</span>
</li>
<li>
<span>
Thanh toán đầy đủ các khoản Thù lao theo đúng thời hạn quy định tại chính sách của
TULIP tùy từng thời điểm.
</span>
</li>
<li>
<span>
Yêu cầu Cộng Tác Viên tuân thủ đầy đủ nghĩa vụ bảo mật thông tin theo Hợp Đồng này. Đồng thời, được quyền áp dụng các khoản phạt vi phạm và bồi thường thiệt hại khi Cộng Tác Viên vi phạm nghĩa vụ này.
</span>
</li>
<li>
<span>Khấu trừ các loại thuế trước khi thanh toán Thù lao cho Cộng Tác viên.</span>
</li>
<li>
<span>Các nghĩa vụ khác theo quy định Hợp Đồng và quy định pháp luật. </span>
</li>
</ol>
</span>
</li>
</ol>

<div style={{marginBottom: '5px'}}>
<strong>
<span>
<span style={{display: 'inline-block', width: '25px'}}>4. </span>Chấm dứt hợp đồng
</span>
</strong>
</div>
<ol className="decimal_type" style={{paddingLeft: '0px'}}>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>4.1</span>
<span style={{width: 'fit-content'}}>
Hợp Đồng này có hiệu lực kể từ ngày ký và không xác định thời hạn.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>4.2</span>
<span style={{width: 'fit-content'}}>
Hợp Đồng này sẽ chấm dứt khi xảy ra các trường hợp dưới đây:
<ol style={{listStyleType: 'lower-roman'}}>
<li>
<span>
Mỗi Bên đều có quyền đơn phương chấm dứt Hợp Đồng này với điều kiện phải thông báo
cho Bên kia bằng văn bản trước ngày dự kiến chấm dứt ít nhất 90 (chín mươi) ngày.
</span>
</li>
<li>
<span>
Nếu một Bên vi phạm bất kỳ điều khoản của Hợp Đồng này và không khắc phục hậu quả
hoặc việc khắc phục không đạt yêu cầu trong vòng 30 (ba mươi) ngày kể từ ngày nhận
được thông báo bằng văn bản của Bên còn lại.
</span>
</li>
<li>
<span>Theo thỏa thuận giữa Các Bên hoặc theo quy định của pháp luật.</span>
</li>
</ol>
</span>
</li>
</ol>

<div style={{marginBottom: '5px'}}>
<strong>
<span>
<span style={{display: 'inline-block', width: '25px'}}>5. </span> Điều khoản chung
</span>
</strong>
</div>
<ol style={{paddingLeft: '0px'}}>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>5.1</span>
<span style={{width: 'fit-content'}}>
Từ thời điểm Hợp Đồng có hiệu lực, Các Bên phải thực hiện quyền và nghĩa vụ đối với nhau
theo cam kết. Hợp Đồng chỉ có thể bị sửa đổi hoặc hủy bỏ theo thỏa thuận bằng văn bản có
đầy đủ chữ ký giữa Các Bên.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>5.2</span>
<span style={{width: 'fit-content'}}>
Trong trường hợp có bất kỳ điều khoản nào trong Hợp Đồng này bị xem là vô hiệu, bất hợp
pháp hoặc không thể thực hiện được, thì những điều khoản khác của Hợp Đồng này vẫn có
hiệu lực thi hành với Các Bên.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>5.3</span>
<span style={{width: 'fit-content'}}>
Một Bên sẽ chịu trách nhiệm và miễn trừ cho Bên kia đối với mọi khiếu nại, thiệt hại,
tổn thất, nghĩa vụ, chi phí, phí tổn, chi phí pháp lý hoặc bất kỳ khoản thanh toán nào
dưới bất cứ hình thức nào mà Bên kia đã phải trả hoặc phải chịu phát sinh từ hoặc liên
quan tới sự vi phạm của Bên đó theo Hợp Đồng này.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>5.4</span>
<span style={{width: 'fit-content'}}>
Hợp Đồng này chịu sự điều chỉnh duy nhất của Pháp luật Việt Nam.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>5.5</span>
<span style={{width: 'fit-content'}}>
Trường hợp có sự mâu thuẫn trong quá trình thực hiện Hợp Đồng, Các Bên cùng thỏa thuận
để giải quyết. Nếu Các Bên không thể giải quyết mâu thuẫn sau 30 (ba mươi) ngày kể từ
ngày xảy ra mâu thuẫn thì một Bên có thể khởi kiện tại Tòa Án.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>5.6</span>
<span style={{width: 'fit-content'}}>
Bên vi phạm Hợp Đồng được miễn trừ trách nhiệm khi việc vi phạm Hợp Đồng này do một
trong các nguyên nhân sau: i) Do sự kiện bất khả kháng; ii) Hoàn toàn do lỗi của Bên
kia; iii) Do thực hiện quyết định của cơ quan quản lý nhà nước có thẩm quyền mà các bên
không thể biết được vào thời điểm giao kết Hợp Đồng. Để được miễn trừ trách nhiệm, Bên
vi phạm phải ngay lập tức gửi thông báo bằng văn bản đến Bên kia từ ngày biết/phải biết
về việc mình không thể thực hiện đúng Hợp Đồng và sẽ cố gắng ngăn chặn hoặc giảm đến mức
tối thiểu ảnh hưởng của các nguyên nhân trên.
</span>
</li>
<li style="display: flex; lineHeight: 20px">
<span style={{display: 'inline-block', width: '25px'}}>5.7</span>
<span style={{width: 'fit-content'}}>
Hợp Đồng này được lập thành 02 (hai) bản chính bằng Tiếng Việt có giá trị pháp lý ngang
nhau, mỗi Bên giữ 01 (một) bản.
</span>
</li>
</ol>
<p>
<span>Các Bên cùng đọc, hiểu rõ toàn bộ nội dung của Hợp Đồng này và ký tên dưới đây.</span>
</p>
<table style={{width: '100%'}}>
<tbody>
<tr style={{display: 'flex', margin: 'auto', textAlign: 'center'}}>
<td style={{flexGrow: 0.6}}>
<p>
<strong>
<span>ĐẠI DIỆN TULIP</span>
</strong>
</p>
<p>
<em>
<span>(Ký tên, đóng dấu)</span>
</em>
</p>
<img
src="https://storage.googleapis.com/image-fina/upload/fina/sign_ceo.png"
style="width: 170px" alt=""
/>
<p>
<strong>
<span>PHẠM ANH KH&Ocirc;I</span>
</strong>

</p>

</td>
<td>
<p>
<strong>
<span>CỘNG TÁC VIÊN</span>
</strong>
</p>
<p>
<em>
<span>(Ký, ghi rõ họ tên)</span>
</em>
</p>
</br>
</br>
</br>
</br>

<p style="marginLeft: 10px">
<strong>
<span>${fullName || ''}</span>
</strong>

</p>
</td>
</tr>

</br>
</tbody>
</table>
    `
  }
};
