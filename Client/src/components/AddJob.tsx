
import { Button, FloatingLabel,Form } from 'react-bootstrap'

const AddJob = () => {
  return (
    <div style={{margin:'5%',height:'100%'}}>
    <FloatingLabel
    controlId="floatingTextarea"
    label="Company Description"
    className="mb-3"
  >
    <Form.Control as="textarea" placeholder="Leave a comment here" />
  </FloatingLabel>
  <FloatingLabel controlId="floatingTextarea2" label="job description" className="mb-3">
    <Form.Control
      as="textarea"
      placeholder="Leave a comment here"
      style={{ height: '100px' }}
    />
  </FloatingLabel>
  <FloatingLabel
        controlId="floatingTextarea"
        label="Job requirement"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="job Title" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      
<Button size="lg"> Publish your offre </Button>
</div>
  )
}

export default AddJob