import PropTypes from 'prop-types';
import {
  DeleteButton,
  Item,
  Name,
  Number,
} from './ContactItem.styled';

const ContactItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <Item>     
      <Name>{name}</Name>
      <Number>{number}</Number>
      <DeleteButton onClick={() => onDeleteContact(id)}>
        Delete
      </DeleteButton>
    </Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;