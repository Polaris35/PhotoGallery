import { memo, ReactNode } from 'react'

type Props = {
    handleClose: () => void
    show: boolean
    children: ReactNode
}
const Modal = ({ handleClose, show, children }: Props) => {
    const showHideClassName = show ? 'modal block' : 'modal hidden'
    return (
        <div className={showHideClassName}>
            <section className="modal-box">
                {children}
                <button className={'btn'} type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    )
}

export default Modal
