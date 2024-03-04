// eslint-disable-next-line react/prop-types
export default function Avatar({ email }) {
  return (
    <img src={`https://api.dicebear.com/7.x/fun-emoji/svg?backgroundColor=d1d4f9&size=48&radius=10&seed=${email}`} alt="avatar" />
  );
}