import { useSelector } from 'react-redux';

function Username() {
  let username = useSelector((state) => state.user.username);
  username = localStorage.getItem('UserName');
  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
