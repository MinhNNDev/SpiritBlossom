import React, { useState, useEffect } from 'react'

// import '../assets/sass/popups.sass'
import Scrollable from '../scrollable/scrollable'
import './popup.sass'
import {Button, CancelBtn, GiveButton} from '../button/button'
import {getCurrentUser, getSelectedCharacter, getSelectedFavorLevel, getNextLevelPoint, getSelectedCharacterPoint, getMaxLevelPoint} from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { actionClickReward, RESPONSE_SUCESS, showErrorPopup, actionGive, loadHistory } from '../../redux/actions'
import api, { ENDPOINT } from '../../utils/request'
import HoverCard from '../hover/hover'

// an object containing setState functions, is mutable
const normalActions = {}

export const Popup = () => {
  const [ children, setChildren ] = useState([])

  normalActions.openPopup = content => setChildren([ ...children, content ])
  normalActions.closePopup = () => setChildren(children.slice(0, children.length - 1))
  normalActions.getCurrentPopup = () => children[ 0 ] || null

  return children.length > 0
    ? (
      <React.Fragment>
        {children.map((child, index) => (
          <div className="normal-popup" key={index}>
            <div className='content'>{ child }</div>
         </div>
        ))}
      </React.Fragment>
    )
    : null
}

export const normalOpenPopup = content => normalActions.openPopup(content)
export const normalClosePopup = () => normalActions.closePopup()
export const normalGetCurrentPopup = () => normalActions.getCurrentPopup()

export const NormalCloseButton = ({ onClose }) => {
  const handleClose = () => {
    normalClosePopup()

    if (onClose) {
      onClose()
    }
  }

  return <div className='close' onClick={ handleClose } />
}

export const popupWithTitle = (title, body) => {
  const content = (
    <div className='rule-popups'>
      <div className='rule-content'>
        <div className='title'>{ title }</div>
        <div className="title-line"></div>
        <div className='body'>
          <Scrollable>{ body }</Scrollable>
        </div>
      </div>
      <NormalCloseButton />
    </div>
  )
  normalOpenPopup(content)
}

export const normalPopup = (body) => {
  const content = (
    <div className='normal-popup'>
      <div className='content'>
        <div className='body'>
          { body }
        </div>
      </div>
      <NormalCloseButton />
    </div>
  )
  normalOpenPopup(content)
}

export const RulePopupContent = () => (
  <div className="rule-table">
<h3>Thời Gian Sự Kiện:</h3> 
<p>23/07/2020 ~ 19/08/2020</p>

<h3>Nội Dung Sự Kiện:</h3>
<ol>
<li>Dùng 20 RP để rút 1 tặng phẩm hoặc vật phẩm ngẫu nhiên. Bạn có thể rút 10 lần với giá rẻ hơn, chỉ 190 RP.
</li>
<li>Tặng phẩm là những món đồ chỉ dùng được trong sự kiện Hoa Linh Lữ Quán. Gửi tặng phẩm cho nhân vật để tăng độ thân thiện. Độ thân thiện đạt mốc sẽ tăng cấp thân thiện của nhân vật. Mỗi lần nhân vật lên cấp thân thiện, họ sẽ tặng lại cho bạn một phần quà giá trị, cao nhất là trang phục Hoa Linh Lục Địa tương ứng với nhân vật.
</li><li>Bạn có thể gửi tặng phẩm cho các nhân vật bằng cách chọn nhân vật mình muốn rồi bấm nút TẶNG QUÀ. Ở bảng Tặng Quà vừa hiện lên, bạn có thể chọn các tặng phẩm mình muốn gửi rồi bấm nút TẶNG. Chú ý số bên cạnh nút TẶNG nhé, nó cho bạn biết những tặng phẩm bạn định gửi giúp tăng bao nhiêu điểm thân thiện với nhân vật đó.
</li><li>Có nhiều loại tặng phẩm khác nhau, chia làm 3 cấp độ. Cấp 1/2/3 giúp tăng 20/40/60 điểm thân thiện. <b>Nếu là tặng phẩm tương ứng với nhân vật được tặng, điểm thân thiện sẽ được tăng thành 30/60/90 điểm.</b>
</li><li><b>Khi đạt cấp thân thiện cao nhất, tiếp tục gửi tặng phẩm cho nhân vật sẽ không được thêm gì. Xin hãy lưu ý!</b>
</li><li>Vật phẩm là những món đồ trong Liên Minh Huyền Thoại, có thể là: Rương Hextech, Chìa Khóa Hextech, 30 Tinh Hoa Cam, 30 Kỉ vật Hoa Linh, Biểu Cảm Kỳ Bí, Mảnh Mẫu Mắt Kỳ Bí.
</li><li>Vật phẩm nhận được sẽ nằm trong Kho Đồ. Bạn có thể vào Kho Đồ để chọn gửi vật phẩm đó đến tài khoản hoặc đổi 3 vật phẩm thành 1 tặng phẩm cấp 3 ngẫu nhiên.
</li><li>Khi mở khóa cả 5 trang phục Hoa Linh Lục Địa đợt 1, bạn nhận được đa sắc Nham Tinh và Hồng Tinh cho các trang phục này (trừ Teemo Phong Linh Tiểu Quái). Phần thưởng sẽ được gửi vào thứ 7 hàng tuần.
</li><li>Khi mở khóa cả 4 trang phục Hoa Linh Lục Địa đợt 2, bạn nhận được đa sắc Nham Tinh và Hồng Tinh cho các trang phục này. Phần thưởng sẽ được gửi vào thứ 7 hàng tuần.
</li><li>Các trang phục Hoa Linh Lục Địa sẽ không có trong Cửa Hàng và trong Chế Tạo Hextech mà chỉ xuất hiện trong các sự kiện đặc biệt. 
</li></ol>

Lưu Ý:
<ol>
<li>Phần thưởng sự kiện chỉ có hiệu lực trong thời gian sự kiện diễn ra. Vui lòng nhận phần thưởng trước khi sự kiện kết thúc.
</li><li>Sự kiện dựa trên xác suất ngẫu nhiên. Vui lòng cân nhắc trước khi tham gia.
</li><li>Hệ thống sẽ gửi vật phẩm trực tiếp đến tài khoản của bạn. Quá trình này có thể mất tối đa 1 ngày. Xin hãy kiên nhẫn nhé.
</li><li>Trường hợp lợi dụng lỗi sự kiện sẽ bị xử lý theo quy định của Liên Minh Huyền Thoại, tùy theo tính chất và mức độ vi phạm. Lỗi sự kiện là những trường hợp sự kiện hoạt động không đúng theo mô tả sự kiện trong Thể Lệ.
</li><li>Nếu gặp vấn đề trong sự kiện. Vui lòng liên hệ <a href="https://hotro.garena.vn" target="_blank">Chăm Sóc Khách Hàng</a> để được hỗ trợ.
</li></ol>

  </div>
)

export const HistoryPopup = () => {
  const {history} = useSelector(getCurrentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadHistory())
  }, [0])

  const MAP_TYPE = {
    convert_to_reward: "Gửi từ kho đồ",
    level_reward: "Quà mốc thân thiện",
  }

  const convertStatus = (status) => status === 'success' ? "Đã gửi" : "Đang gửi"

  return (
    <div className="history-popup">
      <table>
        <thead>
          <th>Thời gian</th>
          <th>Nguồn</th>
          <th>Tên vật phẩm</th>
          <th>Trạng thái</th>
        </thead>
        {history && history.map((element, index) => (
        <tr key={index}>
          <th>{element.create_time.substr(0, 16)}</th>
          <th>{MAP_TYPE[element.type]}</th>
          <th>{element.name}</th>
          <th>{convertStatus(element.status)}</th>
        </tr>
      ))}
      </table>
    </div>
  )
}

const Reward = ({item, clickReward}) => {
  const [selected, setSelected] = useState(false)

  const onClick = () => {
    console.log('click selected', item)
    const originalSelected = selected
    setSelected(!selected)
    const parentUpdateOK = clickReward(item)
    if (parentUpdateOK === false) {
      console.log('parent update not ok')
      setSelected(originalSelected)
    }
  }

  return (
    <HoverCard title={item.name || item.detail.name}>
      <div className="reward-wrap" onClick={clickReward ? onClick: null}>
        <div className={`reward ${selected ? "selected": ""}`} >
          <img src={(item.detail && item.detail.image) || (item.image)} alt={item.name}></img>
          {selected &&
            <div className="flower" />
          }
        </div>
      </div>
    </HoverCard>
  )
}

export const ChampionPopup = () => {

  const {all_affection} = useSelector(getCurrentUser)
  const selectedCharacter = useSelector(getSelectedCharacter)
  const selectedCharacterPoint = useSelector(getSelectedCharacterPoint)
  const nextLevelPoint = useSelector(getNextLevelPoint)
  const favorLevel = useSelector(getSelectedFavorLevel)
  const maxLevelPoint = useSelector(getMaxLevelPoint)
  const [data, setData] = useState([])
  // const [point, setPoint] = useState(0)
  const [selectedIDs, setSelectedIDs] = useState(new Set())
  const dispatch = useDispatch()

  const fetchData = async () => {
    const response = await api(ENDPOINT.getInventory+"?type=INEVENT")
    if (response && response.status == RESPONSE_SUCESS) {
      setData(response.payload)
    }
  }
  useEffect(() => {
    fetchData()
  }, [0])

  let point = 0
  for (let item of data.filter(x => selectedIDs.has(x.id))) {
    if (item.detail.main_character_id === selectedCharacter.id) {
      point += all_affection[item.detail.level].main
    } else {
      point += all_affection[item.detail.level].other
    }
  }
  console.log('point', point)

  const clickReward = (item) => {
    let tmp = new Set(selectedIDs)
    if (tmp.has(item.id)) {
      tmp.delete(item.id)
    } else {
      if (selectedCharacter.user_point + point >= maxLevelPoint) {
        confirm("Đã chọn đủ lượng điểm tối đa", false)
        return false
      }
      tmp.add(item.id)
    }
    setSelectedIDs(tmp)
  }

  const clickGiveToCharacter = async () => {
    if (selectedIDs.size == 0) return
    if (await confirm(`Xác nhận tặng ${point} điểm cho ${selectedCharacter.name}`)) {
      const ids = Array.from(selectedIDs)
      const res = await api(ENDPOINT.giveCharacter, {
        body: {
            ids: JSON.stringify(ids),
            character_id: selectedCharacter.id
        }
      })
      if (!res) {
          return
      }
      if (res.status == RESPONSE_SUCESS) {
        // confirm(`Tặng quà thành công, nhận được ${res.payload.added_point} điểm`, false)
        let msg
        if (res.payload.level_reward.length > 0) {
          msg = `Tặng quà thành công! Độ thân thiện tăng thêm ${res.payload.added_point} điểm và nhận được` 
        } else {
          msg = `Tặng quà thành công! Độ thân thiện tăng thêm ${res.payload.added_point} điểm` 
        }
        showPopupDrawResult(res.payload.level_reward, msg)
        const newData = data.filter(x => !ids.includes(x.id))
        setSelectedIDs(new Set())
        setData(newData)
        dispatch(actionGive(selectedCharacter.id, res.payload.point))
      }   else {
        showErrorPopup(res.error_code)
      }
    }
  }
  

  return (
    <div className="champion-popup">
      <div className="left-side">
        <div className="champion-img"><img src={selectedCharacter.image_popup} /></div>
        <div className="champion-name">{selectedCharacter.name}</div>
        <div className={`champion-favor-progress favor-${favorLevel}`}></div>
        <div className="point-progress">
          {selectedCharacter.user_point}/{nextLevelPoint}
        </div>
      </div>
      <div className="right-side">
        <div className="up">
          <Scrollable>
            <div className="inventory-list">
              {data.map((item, index) => (
                <Reward key={item.id} item={item} clickReward={clickReward}/>
              ))}
            </div>
          </Scrollable>
        </div>
        <div className="down">
          {selectedCharacterPoint < maxLevelPoint &&
            <GiveButton point={point} onClick={clickGiveToCharacter}/>
          }
        </div>
      </div>
      <NormalCloseButton/>
    </div>
  )
}

export const InventoryPopup = () => {
  const [data, setData] = useState([])
  const [selectedIDs, setSelectedIDs] = useState(new Set())

  // const {inventory} = useSelector(getCurrentUser)
  const fetchData = async () => {
    const response = await api(ENDPOINT.getInventory+"?type=ITEM")
    if (response && response.status == RESPONSE_SUCESS) {
      setData(response.payload)
    }
  }
  useEffect(() => {
    fetchData()
  }, [0])

  const clickReward = (item) => {
    let tmp = selectedIDs
    if (tmp.has(item.id)) {
      tmp.delete(item.id)
    } else {
      tmp.add(item.id)
    }
    setSelectedIDs(tmp)
  }

  const clickConvertToReward = async () => {
    if (selectedIDs.size == 0) {
      return
    }
    const Msg = () => (
      <div className="">
        <p>Gửi những vật phẩm đã chọn về tài khoản?</p>
        {/* {data.filter(x=>selectedIDs.has(x.id)).map((item, index) => (<p>{item.detail.name} </p>))} */}
      </div>
    )

    if (await confirm(<Msg />)) {
      const ids = Array.from(selectedIDs)
      const res = await api(ENDPOINT.convertToReward, {
        body: {
            ids: JSON.stringify(ids)
        }
      })
      if (!res) {
          return
      }
      if (res.status == RESPONSE_SUCESS) {
        confirm("Nhận quà thành công", false)
        const newData = data.filter(x => !ids.includes(x.id))
        setSelectedIDs(new Set())
        setData(newData)
      }   else {
        showErrorPopup(res.error_code)
      }
    }
  }

  const clickConvertInevent = async () => {
    if (selectedIDs.size == 0) {
      return
    }
    if (selectedIDs.size % 3 != 0) {
      confirm("Số lượng vật phẩm được chọn cần chia hết cho 3", false)
      return
    }

    if (await confirm("Đổi những vật phẩm đã chọn?")) {
      const ids = Array.from(selectedIDs)
      const res = await api(ENDPOINT.convertToInevent, {
        body: {
            ids: JSON.stringify(ids)
        }
      })
      if (!res) {
          return
      }
      if (res.status == RESPONSE_SUCESS) {
        // confirm("Nhận quà thành công")
        showPopupDrawResult(res.payload.random_items)
        const newData = data.filter(x => !ids.includes(x.id))
        setSelectedIDs(new Set())
        setData(newData)
      }   else {
        showErrorPopup(res.error_code)
      }
    }
  }

  return (
    <div className="inventory-popup">
      <div className="inventory-popup-content">
        <div className="title">KHO ĐỒ</div>
        <div className="reward-list">
          <Scrollable>
            <div className="inventory-list">
              {data.map((item, index) => {
                return (
                  <Reward key={item.id} item={item} clickReward={clickReward}/>
                )}
              )}
            </div>
          </Scrollable>
        </div>
        <div className="btn-list">
          <div className="side">
            <HoverCard title="Gửi những đồ bạn đã chọn vào tài khoản" description="Quá trình này có thể mất tối đa 1 ngày"><div className="question-mark left"></div></HoverCard>
            <div className="btn-send" onClick={clickConvertToReward}>gửi về tài khoản</div>
          </div>
          <div className="side">
            <div className="btn-exchange" onClick={clickConvertInevent}>đổi tặng phẩm</div>
            <HoverCard title="Đổi 3 đồ thành 1 tặng phẩm cấp 3 ngẫu nhiên" description="Tặng phẩm dùng để tăng độ thân thiện cho nhân vật"><div className="question-mark left"></div></HoverCard>
          </div>
        </div>
      </div>
      <NormalCloseButton/>
    </div>
  )
}

export const showPopupDrawResult = (random_items, title = "Chúc mừng bạn đã nhận được những vật phẩm sau") => {
  normalOpenPopup(<DrawResultPopup items={random_items} title={title}/>)
}

export const DrawResultPopup = ({items, title}) => {
  console.log('items', items)
  const handleConfirm = () => {
    normalClosePopup()
  }
  return (
    <div className="draw-popup">
      <div className="draw-popup-content">
        <div className="title">{title}</div>
          <div className="reward-list">
            <Scrollable>
              <div className="inventory-list">
                {items.map((item, index) => {
                  return (
                    <Reward key={index} item={item}/>
                  )}
                )}
              </div>
            </Scrollable>
          </div>
        <Button title={"OK"} onClick={ handleConfirm }></Button>
      </div>
      <NormalCloseButton/>
    </div>
  )
}


export const confirm = (message, hasCancel=true) => (
  new Promise(resolve => {
    console.log('show confirm', message)
    const handleConfirm = () => {
      normalClosePopup()
      resolve(true)
    }
    const handleCancel = () => {
      normalClosePopup()
      resolve(false)
    }
    const handleClose = () => resolve(false)

    const content = (
      <div className='confirm'>
        <div className='body'>
          {/* <div className="title">THÔNG BÁO</div> */}
          <div className='text'>{ message }</div>
          <div className="title-line"></div>
          <div className='action-btns'>
            <Button title={"OK"} onClick={ handleConfirm }></Button>
            { hasCancel &&
              <CancelBtn onClick={ handleCancel }></CancelBtn>
            }
          </div>
        </div>
        <NormalCloseButton onClose={ handleClose } />
      </div>
    )

    normalOpenPopup(content)
  })
)


export const confirmClose = (msg) => confirm(msg, "Đóng", null)