import React from 'react';
import { Button, Select, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './ContactUs.scss';
import { translate } from '../../translations';
import { sendContactLetter } from '../../store/actions/users';
import { selectContactLetterLoading } from '../../store/selectors/users';
import { querySelectorApp } from '../../helpers/getApp';
import { VALIDATION_MESSAGES } from '../../constants';

const { Option } = Select;

const ContactUs = ({ history }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isLoading = useSelector(selectContactLetterLoading);
  const [, type] = history.location.search.split('?type=');

  const formSubmit = async values => {
    await dispatch(sendContactLetter(values));
    form.resetFields();
  };

  const typeVariants = {
    enterprise: 'Enterprise Premium',
    ideas: 'Ideas and Improvements',
    cooperation: 'Proposals for Cooperation',
    technical: 'Technical Support',
    other: 'Other',
  };

  return (
    <div className="ContactUs">
      <div className="ContactUs__wrapper">
        <Form
          form={form}
          scrollToFirstError
          name="ContactUs"
          onFinish={formSubmit}
          validateMessages={VALIDATION_MESSAGES()}
          requiredMark={false}
          layout="vertical"
          className="ContactUs__form"
        >
          <Form.Item
            name="type"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={type && typeVariants[type] ? typeVariants[type] : typeVariants.ideas}
          >
            <Select
              className="form-control form-field__select"
              getPopupContainer={querySelectorApp}
              placeholder={translate('Your message topic*')}
            >
              {Object.values(typeVariants).map(item => (
                <Option key={item} value={item}>
                  {translate(item)}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="message"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea className="form-control" placeholder="Your message*" rows={8} />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            disabled={isLoading}
            className="button button--medium button--purple"
          >
            {translate('Send')}
          </Button>
        </Form>
      </div>
    </div>
  );
};

ContactUs.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export { ContactUs };
