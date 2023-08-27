import React from 'react'
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import Axios from 'axios'
import ReactNotificationAlert from 'react-notification-alert'

export default function FileResources() {
  const [file, setFile] = React.useState([])
  const [inputFields, setInputFields] = React.useState({
    'text': ''
  })
  const [isDisabled, setIsDisabled] = React.useState(true)
  const notificationAlertRef = React.useRef(null)

  React.useEffect(() => {
    if(inputFields.text.length > 0) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [inputFields])

  const getFiles = (event) => {
    event.preventDefault()
    Axios.get(`${process.env.REACT_APP_BASE_URL}/files?text=${inputFields.text}`).then((res) => {
      if (res.data.status === 200) {
        setFile(res.data.files)
      } else {
        notify('danger', res.data.message)
      }
    }).catch((error) => {
      console.log(error)
      notify("danger", error.response.data.message)
    })
  }

  const inputFieldsHandler = (propertyName) => (event) => {
    setInputFields((inputFields) => ({
      ...inputFields,
      [propertyName]: event.target.value,
    }));
  };

  const notify = (type, message) => {
    var options = {}
    options = {
        place: "tr",
        message: (
            <div>
                <div>
                    <b>{message}</b>
                </div>
            </div>
        ),
        type: type,
        icon: "nc-icon nc-bell-55",
        autoDismiss: 10
    }
    notificationAlertRef.current.notificationAlert(options)
  }

  return (
    <>
      <div><ReactNotificationAlert ref={notificationAlertRef} /></div>
      <Container fluid>
        <Row>
          <Col>
            <Form.Control
              size='sm'
              type="text"
              onChange={inputFieldsHandler("text")}
            ></Form.Control>
          </Col>
          <Col>
            <>
              {isDisabled ?
                <Button
                  className="btn-fill"
                  variant="primary"
                  size="sm"
                  disabled
                >
                  Search
                </Button> : 
                <Button
                  className="btn-fill"
                  variant="primary"
                  size="sm"
                  onClick={getFiles}
                >
                  Search
                </Button>
              }
            </>
          </Col>
        </Row>
        <br />
        <Row>
          <Card>
            <Card.Body>
              <Form>
                <Table className="table-hover table-bordered">
                  <tbody>
                    <tr>
                      <th className="border-0 text-center" colSpan="3">
                        <h3>
                          <strong>List of Files</strong>
                          </h3>
                        </th>
                    </tr>
                    <tr>
                      <th>No</th>
                      <th>File Name</th>
                      <th>Process Time</th>
                    </tr>
                    {file.map((res, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{res.file}</td>
                              <td>{res.time}</td>
                            </tr>
                          );
                        })}
                  </tbody>
                </Table>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}
