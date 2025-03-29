import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function GetStoryContent({ addContentState, setAddContent }) {
    const [preview, setPreview] = React.useState(null);
    const formik = useFormik({
        initialValues: {
            image: null,
            description: "",
        },
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            await saveToLocalstorage(values);
            resetForm();
            setPreview(null);
            setSubmitting(false);
            setAddContent(false);
        },
        validationSchema: yup.object({
            image: yup.mixed()
                .required("You need to upload an image")
                .test("fileType", "Unsupported file format (only JPEG/PNG)", (value) => {
                    if (!value) return false;
                    return ["image/jpeg", "image/png"].includes(value.type);
                })
                .test("fileSize", "File too large (max 2MB)", (value) => {
                    if (!value) return false;
                    return value.size <= 2 * 1024 * 1024;
                }),
            description: yup.string().max(100, 'Description must be less than 100 characters')
        })
    });
    const saveToLocalstorage = async (values) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onloadend = () => {
                const entry = {
                    id: Date.now(),
                    image: reader.result,
                    description: values.description || '',
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem(`entry_${entry.id}`, JSON.stringify(entry));
                resolve();
            };
            if (values.image) {
                reader.readAsDataURL(values.image);
            }
        });
    };
    return (
        <div className="">
            {addContentState && (
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-20">
                    <div className="fixed inset-0 flex items-center justify-center z-30">
                        <div className="bg-white dark:bg-[#1B1B1F] dark:text-white p-8 rounded-lg shadow-xl max-w-md w-full md:min-w-[500px]">
                            <div className="flex justify-end mb-5">
                                <button
                                    type="button"
                                    className='cursor-pointer'
                                    onClick={() => setAddContent(false)}
                                >
                                    <X />
                                </button>
                            </div>
                            <form className='flex flex-col items-center' onSubmit={formik.handleSubmit}>
                                <div className="w-full mb-4">
                                    <label htmlFor="image" className="block mb-2">Image</label>
                                    <div className="min-h-[140px] border-dashed border-2 rounded-2xl flex justify-center items-center">
                                        {preview ? (
                                            <img src={preview} alt='preview' className='w-[50px] h-[50px] object-contain' />
                                        ) : (
                                            <span className="text-gray-500">Select an image</span>
                                        )}
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(event) => {
                                                const file = event.currentTarget.files[0];
                                                formik.setFieldValue("image", file);
                                                setPreview(file ? URL.createObjectURL(file) : null);
                                            }}
                                        />
                                        <label
                                            htmlFor="image"
                                            className="cursor-pointer p-4 text-blue-600"
                                        >
                                            Click to upload
                                        </label>
                                    </div>
                                    {formik.errors.image && formik.touched.image && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.image}
                                        </div>
                                    )}
                                </div>
                                <div className="w-full mb-4">
                                    <label htmlFor="description" className="block mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        placeholder='Optional description'
                                        className='w-full border-[1.5px] p-3 rounded-2xl dark:bg-gray-800'
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.description && formik.touched.description && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.description}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400'
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting ? 'Posting...' : 'Post'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}