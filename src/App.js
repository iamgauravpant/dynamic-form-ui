import { Button, Form, Input, InputNumber,Select,Row,Col,Radio,Checkbox } from 'antd';
import myObj from './templateInputTypes';
import { MinusCircleOutlined, PlusOutlined , DeleteOutlined}  from '@ant-design/icons';
const {Option} = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 6 },
  },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};

const App = () => {
  const [form] = Form.useForm();
  console.log("formm :",form)
  console.log("myObj :",myObj.templateFeildTypes);
  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <div className='form-static-content'>
          <Form.Item
            name={['formInfo', 'name']}
            label="Survey Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['formInfo', 'description']}
            label="Survey Description"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['formInfo', 'formId']}
            label="Survey Id"
            rules={[
              {
                type: 'number',
                min: 1,
                max: 10000,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </div>

        <div className='form-dynamic-content'>
          <Form.List name="fields" initialValue={[""]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key}>
                    <Row>
                      <Col span={18}>
                        <Form.Item
                          {...restField}
                          name={[name, 'label']}
                          label="Input Label :"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={2}></Col>
                      <Col span={4}>
                        <Form.Item>                      
                          {
                            fields.length>1 ?
                            <Button onClick={()=>remove(name)} icon={<DeleteOutlined style={{color:"red"}}/>}/>:""
                          }
                        </Form.Item>
                      </Col>
                    </Row>

                    {/* <Col span={24}>
                      <Form.Item 
                        name={[name,'dataType']}
                        {...restField}
                        label="Input Type :"

                      >
                        <Select>
                        {
                          myObj.templateFeildTypes.map((obj,index)=>
                          (<Option key={index} value={obj.key}>
                            {obj.value}
                          </Option>)
                          )
                        }
                        </Select>
                      </Form.Item>
                    </Col> */}
                    
                    <Row gutter={60}> 
                      <Col span={8}></Col>
                      <Col span={4}> 
                        <Form.Item name={[name,'required']} valuePropName='checked'>
                          <Checkbox value={"required"}>required</Checkbox>
                        </Form.Item>
                      </Col>

                      <Col span={4}> 
                        <Form.Item name={[name,'info']} valuePropName='checked'>
                            <Checkbox value={"info"} onChange={(value)=>{
                              form.setFieldsValue({
                                [`${name}.selectedOption1`]:value.target.checked
                              })
                            }}>info</Checkbox>
                        </Form.Item>
                      </Col>

                      <Col span={4}> 
                        <Form.Item name={[name,'placeholder']} valuePropName='checked'>
                          <Checkbox value={"placeholder"}  onChange={(value)=>{
                              form.setFieldsValue({
                                [`${name}.selectedOption2`]:value.target.checked
                              })
                            }}>placeholder</Checkbox>
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                          <Form.Item
                            {...restField}
                            name={[name, `dataType`]}
                            label={ "val_type"}
                          >
                            <Select
                              placeholder={"plce_type"}
                              onChange={(value) => {
                                form.setFieldsValue({
                                  [`${name}.selectedOption3`]: value,
                                });
                              }}
                            >
                              {myObj.templateFeildTypes.map((rt) => (
                                <Option value={rt.key}>{rt.value}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                      </Col>

                    </Row>
                    <Col span={24}>
                        {
                          form.getFieldValue(`${name}.selectedOption1`) === true && (
                            <Form.Item {...restField} name={[name,'input_info']} label='Input Info'>
                              <Input />
                            </Form.Item>
                          )
                        }
                      </Col>
                      <Col span={24}>
                        {
                          form.getFieldValue(`${name}.selectedOption2`) === true && (
                            <Form.Item {...restField} name={[name,'input_placeholder']} label='Input Placeholder'>
                              <Input />
                            </Form.Item>
                          )
                        }
                      </Col>


                      {(form.getFieldValue(`${name}.selectedOption3`) ===
                          3) && (
                          <>
                            <Col span={20}>
                              <Form.Item {...restField}>
                                <Form.List
                                  initialValue={[""]}
                                  name={[name, "options"]}
                                >
                                  {(
                                    subFields,
                                    { add: subAdd, remove: subRemove }
                                  ) => (
                                    <>
                                      {subFields.map((fiel, index) => (
                                        <Form.Item
                                          {...(index === 0
                                            ? formItemLayout
                                            : formItemLayoutWithOutLabel)}
                                          label={
                                            index === 0
                                              ?"options"
                                              : ""
                                          }
                                          required={false}
                                          key={fiel.key}
                                        >
                                          <Form.Item
                                            {...fiel}
                                            validateTrigger={[
                                              "onChange",
                                              "onBlur",
                                            ]}
                                            rules={[
                                              {
                                                required: true,
                                                whitespace: true,
                                                message: "option_rule",
                                              },
                                            ]}
                                            noStyle
                                          >
                                            <Input
                                              placeholder={"option_name"}
                                              style={{ width: "80%" }}
                                            />
                                          </Form.Item>

                                          {subFields.length > 1 ? (
                                            <Button
                                              style={{
                                                marginLeft: "8px",
                                                marginBottom: "15px",
                                                color: "blue",
                                                backgroundColor: "red",
                                              }}
                                              icon={
                                                <DeleteOutlined
                                                  className="dynamic-delete-button"
                                                  style={{
                                                    margin: "0 2px",
                                                    color: "#fff",
                                                  }}
                                                />
                                              }
                                              onClick={() => {
                                                subRemove(fiel.name);
                                              }}
                                            ></Button>
                                          ) : null}

                                          {index === subFields.length - 1 && (
                                            <Button
                                              type="dashed"
                                              onClick={() => {
                                                subAdd();
                                              }}
                                              icon={
                                                <PlusOutlined
                                                  style={{ color: "blue" }}
                                                />
                                              }
                                              style={{
                                                marginLeft: "10px",
                                                backgroundColor: "whitesmoke",
                                              }}
                                            ></Button>
                                          )}
                                        </Form.Item>
                                      ))}
                                    </>
                                  )}
                                </Form.List>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                        {(form.getFieldValue(`${name}.selectedOption3`) === 5) && (
                          <>
                            <Col span={20}>
                              <Form.Item {...restField}>
                                <Form.List
                                  initialValue={[""]}
                                  name={[name, "options"]}
                                >
                                  {(
                                    subFields,
                                    { add: subAdd, remove: subRemove }
                                  ) => (
                                    <>
                                      {subFields.map((fiel, index) => (
                                        <Form.Item
                                          {...(index === 0
                                            ? formItemLayout
                                            : formItemLayoutWithOutLabel)}
                                          label={
                                            index === 0
                                              ?  "options" 
                                              : ""
                                          }
                                          required={false}
                                          key={fiel.key}
                                        >
                                          <Form.Item
                                            {...fiel}
                                            validateTrigger={[
                                              "onChange",
                                              "onBlur",
                                            ]}
                                            rules={[
                                              {
                                                required: true,
                                                whitespace: true,
                                                message:  "option_rule",
                                              },
                                            ]}
                                            noStyle
                                          >
                                            <Input
                                              placeholder={"option_name"}
                                              style={{ width: "80%" }}
                                            />
                                          </Form.Item>

                                          {subFields.length > 1 ? (
                                            <Button
                                              style={{
                                                marginLeft: "8px",
                                                marginBottom: "15px",
                                                color: "blue",
                                                backgroundColor: "red",
                                              }}
                                              icon={
                                                <DeleteOutlined
                                                  className="dynamic-delete-button"
                                                  style={{
                                                    margin: "0 2px",
                                                    color: "#fff",
                                                  }}
                                                />
                                              }
                                              onClick={() => {
                                                subRemove(fiel.name);
                                              }}
                                            ></Button>
                                          ) : null}

                                          {index === subFields.length - 1 && (
                                            <Button
                                              type="dashed"
                                              onClick={() => {
                                                subAdd();
                                              }}
                                              icon={
                                                <PlusOutlined
                                                  style={{ color: "blue" }}
                                                />
                                              }
                                              style={{
                                                marginLeft: "10px",
                                                backgroundColor: "whitesmoke",
                                              }}
                                            ></Button>
                                          )}
                                        </Form.Item>
                                      ))}
                                    </>
                                  )}
                                </Form.List>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                        {(form.getFieldValue(`${name}.selectedOption3`) === 6 ) && (
                          <>
                            <Col span={20}>
                              <Form.Item
                                name={[name, `selec`]}
                                label={ "selec_type"}
                                key={key}
                              >
                                <Radio.Group>
                                  <Radio value="Single">
                                    {"single" }
                                  </Radio>
                                  <Radio value="Multiple">
                                    {"multiple"}
                                  </Radio>
                                </Radio.Group>
                              </Form.Item>
                            </Col>

                            <Col span={20}>
                              <Form.Item {...restField}>
                                <Form.List
                                  initialValue={[""]}
                                  name={[name, "options"]}
                                >
                                  {(
                                    subFields,
                                    { add: subAdd, remove: subRemove }
                                  ) => (
                                    <>
                                      {subFields.map((fiel, index) => (
                                        <Form.Item
                                          {...(index === 0
                                            ? formItemLayout
                                            : formItemLayoutWithOutLabel)}
                                          label={
                                            index === 0
                                              ?  "options" 
                                              : ""
                                          }
                                          required={false}
                                          key={fiel.key}
                                        >
                                          <Form.Item
                                            {...fiel}
                                            validateTrigger={[
                                              "onChange",
                                              "onBlur",
                                            ]}
                                            rules={[
                                              {
                                                required: true,
                                                whitespace: true,
                                                message: "options_rule",
                                              },
                                            ]}
                                            noStyle
                                          >
                                            <Input
                                              placeholder={"option_name"}
                                              style={{ width: "80%" }}
                                            />
                                          </Form.Item>

                                          {subFields.length > 1 ? (
                                            <Button
                                              style={{
                                                marginLeft: "8px",
                                                marginBottom: "15px",
                                                color: "blue",
                                                backgroundColor: "red",
                                              }}
                                              icon={
                                                <DeleteOutlined
                                                  className="dynamic-delete-button"
                                                  style={{
                                                    margin: "0 2px",
                                                    color: "#fff",
                                                  }}
                                                />
                                              }
                                              onClick={() => {
                                                subRemove(fiel.name);
                                              }}
                                            ></Button>
                                          ) : null}

                                          {index === subFields.length - 1 && (
                                            <Button
                                              type="dashed"
                                              onClick={() => {
                                                subAdd();
                                              }}
                                              icon={
                                                <PlusOutlined
                                                  style={{ color: "blue" }}
                                                />
                                              }
                                              style={{
                                                marginLeft: "10px",
                                                backgroundColor: "whitesmoke",
                                              }}
                                            ></Button>
                                          )}
                                        </Form.Item>
                                      ))}
                                    </>
                                  )}
                                </Form.List>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                  </Row>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

      </Form>
    </div>)
};
export default App;