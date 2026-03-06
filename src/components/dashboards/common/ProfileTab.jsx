import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AvatarEditor from "react-avatar-editor";
import {
  useUpdateProfileInfoMutation,
  useUpdateProfileImageMutation,
  useDeleteProfileImageMutation,
} from "../../../Services/sharedServices/profileServices";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, updateUserImage } from "../../../features/authSlice";

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
    "tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500";

  const errorClass = "tw-text-red-500 tw-text-xs tw-mt-1";

  return (
    <>
      <div className="tw-max-w-2xl tw-space-y-6">
        <h2 className="tw-text-xl tw-font-semibold">
          Profile Information
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="tw-bg-gray-50 tw-border tw-rounded-xl tw-p-6 tw-space-y-6"
        >
          {/* Avatar Section */}
          <div className="tw-flex tw-items-center tw-gap-6">
            <div
              className="tw-w-20 tw-h-20 tw-rounded-full tw-overflow-hidden tw-bg-gray-200 tw-cursor-pointer"
              onClick={triggerFileInput}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="avatar"
                  className="tw-w-full tw-h-full tw-object-cover"
                />
              ) : (
                <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-bg-gradient-to-br tw-from-blue-400 tw-to-purple-500 tw-text-white tw-text-2xl tw-font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            <div className="tw-flex-1">
              <p className="tw-font-medium tw-text-lg">{user?.name}</p>
              <p className="tw-text-sm tw-text-gray-600">{user?.email}</p>

              <div className="tw-flex tw-gap-3 tw-mt-2">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="tw-text-sm tw-text-blue-600 tw-font-medium"
                >
                  Change Photo
                </button>

                {selectedFile && (
                  <>
                    <span className="tw-text-gray-400">•</span>
                    <button
                      type="button"
                      onClick={handleSavePhoto}
                      disabled={isSavingImage}
                      className="tw-text-sm tw-text-green-600 tw-font-medium disabled:tw-opacity-50"
                    >
                      {isSavingImage ? "Saving..." : "Save Photo"}
                    </button>
                  </>
                )}

                {preview && !selectedFile && (
                  <>
                    <span className="tw-text-gray-400">•</span>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={isDeletingImage}
                      className="tw-text-sm tw-text-red-600 tw-font-medium disabled:tw-opacity-50"
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
              className="tw-hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Name */}
          <div>
            <label className="tw-block tw-mb-1 tw-text-sm tw-font-medium">
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
            <label className="tw-block tw-mb-1 tw-text-sm tw-font-medium">
              Email
            </label>
            <input
              {...formik.getFieldProps("email")}
              disabled
              className={`${inputClass} tw-bg-gray-100`}
            />
          </div>


          {/* Save Profile Info */}
          <div className="tw-flex tw-justify-end">
            <button
              type="submit"
              disabled={isSavingInfo}
              className="tw-bg-blue-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg disabled:tw-opacity-50"
            >
              {isSavingInfo ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Crop Modal */}
      {showCropModal && cropImage && (
        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-75 tw-flex tw-items-center tw-justify-center tw-z-50">
          <div className="tw-bg-white tw-rounded-xl tw-p-6">
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

            <div className="tw-mt-4">
              <input
                type="range"
                min="1"
                max="2"
                step="0.01"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="tw-w-full"
              />
            </div>

            <div className="tw-flex tw-justify-end tw-gap-3 tw-mt-4">
              <button
                onClick={() => setShowCropModal(false)}
                className="tw-px-4 tw-py-2 tw-text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCrop}
                className="tw-px-4 tw-py-2 tw-bg-blue-600 tw-text-white tw-rounded-lg"
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