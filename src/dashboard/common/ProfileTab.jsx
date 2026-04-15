import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AvatarEditor from "react-avatar-editor";
import {
  useUpdateProfileInfoMutation,
  useUpdateProfileImageMutation,
  useDeleteProfileImageMutation,
} from '@/Services/sharedServices/profileServices';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, updateUserImage } from '@/features/authSlice';

const ProfileTab = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.image || null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [cropImage, setCropImage] = useState(null);
  const dispatch = useDispatch()

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const [updateProfileInfo, { isLoading: isSavingInfo }] =
    useUpdateProfileInfoMutation();

  const [updateProfileImage, { isLoading: isSavingImage }] =
    useUpdateProfileImageMutation();

  const [deleteProfileImage, { isLoading: isDeletingImage }] =
    useDeleteProfileImageMutation();

  // ------------------ FORM ------------------

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",

    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email().required("Email is required"),

    }),
    onSubmit: async (values) => {
      try {
        const res = await updateProfileInfo({
          name: values.name,
        }).unwrap();

        dispatch(login(res));   // update redux with new user data

        toast.success("Profile updated successfully");
      } catch (error) {
        console.error(error);
      }
    }
  });

  // ------------------ IMAGE HANDLING ------------------

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCropImage(reader.result);
      setShowCropModal(true);
      setZoom(1);
      setRotation(0);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCrop = () => {
    if (!editorRef.current) return;

    const canvas = editorRef.current.getImageScaledToCanvas();

    canvas.toBlob(
      (blob) => {
        const croppedFile = new File([blob], "profile-image.jpg", {
          type: "image/jpeg",
        });

        setSelectedFile(croppedFile);
        setPreview(canvas.toDataURL());
        setShowCropModal(false);
        setCropImage(null);
      },
      "image/jpeg",
      0.9
    );
  };
  const handleSavePhoto = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("profileImage", selectedFile);

      const res = await updateProfileImage(formData).unwrap();

      dispatch(updateUserImage(res.profileImage));

      toast.success("Image uploaded");

      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleRemoveImage = async () => {
    try {
      await deleteProfileImage().unwrap();

      setSelectedFile(null);
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <>
      <div className="max-w-2xl space-y-6">
        <h2 className="text-xl font-semibold">
          Profile Information
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-gray-50 border rounded-xl p-6 space-y-6"
        >
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div
              className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 cursor-pointer"
              onClick={triggerFileInput}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-400 to-purple-500 text-white text-2xl font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium text-lg">{user?.name}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="text-sm text-blue-600 font-medium"
                >
                  Change Photo
                </button>

                {selectedFile && (
                  <>
                    <span className="text-gray-400">•</span>
                    <button
                      type="button"
                      onClick={handleSavePhoto}
                      disabled={isSavingImage}
                      className="text-sm text-green-600 font-medium disabled:opacity-50"
                    >
                      {isSavingImage ? "Saving..." : "Save Photo"}
                    </button>
                  </>
                )}

                {preview && !selectedFile && (
                  <>
                    <span className="text-gray-400">•</span>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={isDeletingImage}
                      className="text-sm text-red-600 font-medium disabled:opacity-50"
                    >
                      {isDeletingImage ? "Removing..." : "Remove"}
                    </button>
                  </>
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              {...formik.getFieldProps("name")}
              className={inputClass}
            />
            {formik.touched.name && formik.errors.name && (
              <p className={errorClass}>{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              {...formik.getFieldProps("email")}
              disabled
              className={`${inputClass} bg-gray-100`}
            />
          </div>


          {/* Save Profile Info */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSavingInfo}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {isSavingInfo ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Crop Modal */}
      {showCropModal && cropImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6">
            <AvatarEditor
              ref={editorRef}
              image={cropImage}
              width={250}
              height={250}
              border={50}
              borderRadius={125}
              scale={zoom}
              rotate={rotation}
            />

            <div className="mt-4">
              <input
                type="range"
                min="1"
                max="2"
                step="0.01"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowCropModal(false)}
                className="px-4 py-2 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCrop}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileTab;