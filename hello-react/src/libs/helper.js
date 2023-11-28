import moment from 'moment'
import toast from 'react-hot-toast'
import { X } from 'react-feather'

const close = (
    <button type='button' className='ms-1 btn-close'>
        <span>×</span>
    </button>
)

export default {
    defaultYear: moment().add(1, 'years').format('YYYY'),
    intThousand: value => {
        let hasil = value

        if (hasil != '' && typeof hasil !== 'undefined') {
            hasil = hasil.toString().replace(/\./g, '')
            hasil = hasil.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        return hasil
    },
    setInputIntOnly: (evt) => {
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            evt.preventDefault()
    },
    showError: (err, title) => {
        console.log({ err: err.response });
        let showError = err.response ? err.response.data?.pesan : err.request ? err.request.responseText : 'Error ' + err.message;
        if (typeof showError !== 'string')
            showError = ''

        toast.error(
            t => (
                <div className='w-100 d-flex align-items-center justify-content-between'>
                    <div>
                        <p className='mb-0'>{title}</p>
                        <small>{showError}</small>
                    </div>
                    <X size='14' onClick={() => toast.dismiss(t.id)} />
                </div>


            ),
            {
                style: {
                    minWidth: '300px'
                },
            }
        )
    },
    showToast: (type, title, pesan, position = null) => {
        let tFunction = t => (
            <div className='w-100 d-flex align-items-center justify-content-between'>
                <div>
                    <p className='mb-0'>{title}</p>
                    <small>{pesan}</small>
                </div>
                <X size='14' onClick={() => toast.dismiss(t.id)} />
            </div>
        )
        let options = {
            style: {
                minWidth: '300px'
            },
            position,
        }

        if (type == 'success')
            toast.success(tFunction, options)
        else
            toast.error(tFunction, options)
    }
};