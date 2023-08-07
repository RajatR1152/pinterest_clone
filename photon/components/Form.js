'use client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import app from '@/app/shared/fireBaseConfig'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import Spinner from './Spinner'


export default function Form() {

    const db = getFirestore(app);
    const postId = Date.now().toString();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file: '',
        link: ''
    });

    let n;
    let v;

    function handle(e) {
        n = e.target.name;
        v = e.target.value;
        setFormData({ ...formData, [n]: v });
    }

    function handleFile(e) {
        setFormData({ ...formData, file: e.target.files[0] })
    }

    function OnSave(e) {
        e.preventDefault();
        setLoading(true);
        uploadFile();
    }

    const storage = getStorage(app)

    const uploadFile = () => {
        const storageRef = ref(storage, 'photon/' + formData.file.name);
        uploadBytes(storageRef, formData.file).then((snapshot) => {
        }).then((res) => {
            getDownloadURL(storageRef).then(async (url) => {
                const postData = {
                    title: formData.title,
                    description: formData.description,
                    link: formData.link,
                    image: url,
                    author: session.user.name,
                    authorImg: session.user.image,
                    email: session.user.email,
                    id: postId
                }

                await setDoc(doc(db, 'posts', postId), postData).then((res) => {
                    console.log('saved');
                    setLoading(false);
                    setFormData({
                        title: '',
                        description: '',
                        file: '',
                        link: ''
                    });
                })
            })
        })
    }

    return (
        <div className="contianer md:w-10/12 p-2 md:p-8 rounded-lg h-fit md:h-[84%] bg-white shadow-xl md:mt-5 flex md:flex-row flex-col mx-auto">
            <div className="container md:w-5/12 p-5">

                <label htmlFor="postimg">
                    <div className="container h-[80%] md:h-full mx-auto w-full border-4 border-dotted">
                        {
                            formData.file ? (
                                <img src={window.URL.createObjectURL(formData.file)} alt='' className='w-full h-[100%]' />
                            )
                                :
                                (
                                    <BsCloudUpload className='text-gray-500 w-fit mx-auto my-20 md:my-40' size={50} />
                                )
                        }
                    </div>
                </label>

                <input type="file" name="postimg" hidden onChange={handleFile} id="postimg" />

            </div>
            <form className="container md:w-7/12 p-5">

                <div className="container my-8 w-fit gap-3 p-2 flex justify-center items-center flex-row">
                    <img src={session?.user.image} alt="" className="w-14 h-14 m-auto rounded-full" />
                    <h2 className="text-xl font-semibold text-gray-700">{session?.user.name}</h2>
                </div>

                <div className="w-full my-6">
                    <h1 className="text-2xl font-bold text-gray-600">Title</h1>
                    <input type="text" name='title' value={formData.title} onChange={handle} placeholder='title...' className="border-b-4 border-gray-400 p-3 bg-transparent rounded-md w-full focus:outline-none my-3" />
                </div>

                <div className="w-full my-6">
                    <h1 className="text-2xl font-bold text-gray-600">Description</h1>
                    <textarea type="text" name='description' value={formData.description} onChange={handle} placeholder='description...' className="border-b-4 border-gray-400 p-3 bg-transparent rounded-md w-full focus:outline-none my-3" />
                </div>

                <button className="p-3 bg-red-500 font-bold text-white w-full text-xl rounded-md" onClick={OnSave}>{loading ? <Spinner size={10} color={'white'} /> : "save"}</button>

            </form>
        </div>
    )
}

