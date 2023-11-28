import { useState } from 'react'

import Breadcrumbs from '@components/breadcrumbs'
import { Card, CardHeader, CardBody, CardTitle, Col, Form, Button, Spinner } from "reactstrap"
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'

// ** Custom Components
import UILoader from '@components/ui-loader'

const FormCommon = ({ children, title, dataBreadCrumbs, action, isShowData, path, handleSubmit, mutate }) => {
  // ** States
  const [isSubmit, setIsSubmit] = useState(false)

  const onSubmit = data => {
    setIsSubmit(true)
    mutate(data)
    setIsSubmit(false)
  }
  return <>
    <Breadcrumbs title={title} data={dataBreadCrumbs} />
    <Card>
      <CardHeader>
        <CardTitle>{action} Data</CardTitle>
        <CardTitle>
          <Button size='sm' color='secondary' tag={Link} to={path} className='btn-icon'>
            <ArrowLeft size={14} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <UILoader blocking={!isShowData}>
            <Col className='mb-1 offset-sm-1' sm='10'>
              {children}
              <Col className='text-end' sm='12'>
                <Button color='primary' type='submit' disabled={isSubmit} size="sm">
                  {isSubmit ? <Spinner className='me-25' size='sm' /> : 'Simpan'}
                </Button>
              </Col>
            </Col>
          </UILoader>
        </Form>
      </CardBody>
    </Card>
  </>
}

export default FormCommon
