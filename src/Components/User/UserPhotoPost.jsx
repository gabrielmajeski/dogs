import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Form/Input';
import Button from '../Form/Button';
import styles from './UserPhotoPost.module.css';
import useForm from '../../Hooks/useForm';
import Error from '../Helper/Error';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_POST } from '../../api';
import Head from '../Helper/Head';

const UserPhotoPost = () => {
  const nome = useForm();
  const idade = useForm('number');
  const peso = useForm('number');
  const [img, setImg] = React.useState({});
  const { error, data, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('idade', idade.value);
    formData.append('peso', peso.value);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    const { json } = request(url, options);
    console.log(json);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }
  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />

      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
