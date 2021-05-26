import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { createSquad, getOwnerSquads } from '../../store/ownerSquads';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import CopyToClipElement from './CopyToClipElement';

export default function CreateSquad() {
    const user = useSelector(state => state.session.user)
    const squads = useSelector(state => Object.values(state.ownerSquads));
    const dispatch = useDispatch()
    const ref = useRef();
    const [open, setOpen] = useState(false);
    const [openSecond, setOpenSecond] = useState(false);
    const [crew, setCrew] = useState("");
    const [code, setCode] = useState("");

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleCreateSquad = async (e) => {
        e.preventDefault();
        const data = {
            name: crew,
            userId: user.id,
        }
        await dispatch(createSquad(data))
        await dispatch(getOwnerSquads(user.id))
        await setCode(`${crew.replace(/\s+/g, '-').toLowerCase()}-${user.id}-${squads[squads.length - 1].id}`)
        await setOpenSecond(true)
        setCrew("");
    }

    let copySuccess;
    const handleCopy = e => {
        copySuccess = "Text copied successfully"
    }

    return (
        <>
            <div>
                <Button onClick={onOpenModal}>Create a squad</Button>
                <Modal open={open} onClose={onCloseModal} center>
                    <h2>Enter a name for your crew</h2>
                    <input
                        className=""
                        value={crew}
                        onChange={e => setCrew(e.target.value)}
                    />
                    <div className="squad__container-create">
                        <Button type="submit" onClick={handleCreateSquad} variant="primary">Submit</Button>
                    </div>
                </Modal>
                <Modal open={openSecond} onClose={() => setOpenSecond(false)} center>
                    <h3>Share this code with your cleaning crew!</h3>
                    <div>
                        {copySuccess}
                    </div>
                    {code}
                    <div>
                        <Button
                            variant="secondary"
                            onClick={handleCopy}
                        >
                            Click to copy!
                        </Button>
                        <CopyToClipElement text={code} />
                    </div>
                </Modal>
            </div>
        </>
    )
}
