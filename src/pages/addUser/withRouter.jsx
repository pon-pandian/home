import { useLocation } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
  const location = useLocation();
  

  return (
    <WrappedComponent
      {...props}
      {...{ location }}
    />
  );
};

export default withRouter;

