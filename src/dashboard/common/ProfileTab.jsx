import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import AvatarEditor from "react-avatar-editor";
import {
  useUpdateProfileInfoMutation,
  useUpdateProfileImageMutation,
  useDeleteProfileImageMutation,
} from '@/Services/sharedServices/profileServices';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, updateUserImage } from '@/features/authSlice';
import { useTheme } from '@/context/ThemeContext';
import { FiUser, FiMail, FiSave, FiCamera, FiTrash2, FiX, FiCheck } from "react-icons/fi";

const ProfileTab = ({ user, isDark: isDarkProp }) => {
  const { theme } = useTheme();
  const isDark = isDarkProp !== undefined ? isDarkProp : theme === 'dark';
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

        dispatch(login(res));
        toast.success("Profile updated successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update profile");
      }
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large (max 5MB)");
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
        toast.success("Image cropped successfully");
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
      toast.success("Profile photo updated successfully");
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update photo");
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
      toast.success("Profile photo removed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove photo");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const inputClass = isDark
    ? "w-full border border-dark_border rounded-xl px-4 py-3 text-sm bg-darklight text-white placeholder-gray focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
    : "w-full border border-border rounded-xl px-4 py-3 text-sm bg-light text-midnight_text placeholder-gray focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition";

  const errorClass = isDark ? "text-rose-400 text-xs mt-1 flex items-center gap-1" : "text-rose-500 text-xs mt-1 flex items-center gap-1";

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center`}>
            <FiUser className={`h-5 w-5 text-primary`} />
          </div>
          <div>
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-midnight_text'}`}>
              Profile Information
            </h2>
            <p className={`text-sm text-gray mt-0.5`}>
              Update your personal details and profile photo
            </p>
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className={` p-6 space-y-6`}
        >
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b ${isDark ? 'border-dark_border' : 'border-border'}">
            <div
              className={`relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group ${
                isDark ? 'bg-darkmode' : 'bg-section'
              } shadow-lg`}
              onClick={triggerFileInput}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary to-skyBlue text-white text-3xl font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FiCamera className="text-white h-6 w-6" />
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-midnight_text'}`}>
                {user?.name}
              </p>
              <p className={`text-sm text-gray mb-3`}>
                {user?.email}
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isDark
                      ? 'bg-primary/20 text-primary hover:bg-primary/30'
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  <FiCamera className="h-3.5 w-3.5" />
                  Change Photo
                </button>

                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleSavePhoto}
                    disabled={isSavingImage}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      isDark
                        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                        : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
                    } disabled:opacity-50`}
                  >
                    <FiSave className="h-3.5 w-3.5" />
                    {isSavingImage ? "Saving..." : "Save Photo"}
                  </button>
                )}

                {preview && !selectedFile && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={isDeletingImage}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      isDark
                        ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                        : 'bg-rose-500/10 text-rose-600 hover:bg-rose-500/20'
                    } disabled:opacity-50`}
                  >
                    <FiTrash2 className="h-3.5 w-3.5" />
                    {isDeletingImage ? "Removing..." : "Remove"}
                  </button>
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

          {/* Name Field */}
          <div>
            <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray' : 'text-midnight_text'}`}>
              Full Name
            </label>
            <input
              {...formik.getFieldProps("name")}
              className={inputClass}
              placeholder="Enter your full name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className={errorClass}>
                <FiX className="h-3 w-3" />
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email Field (Disabled) */}
          <div>
            <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray' : 'text-midnight_text'}`}>
              Email Address
            </label>
            <div className="relative">
              <input
                {...formik.getFieldProps("email")}
                disabled
                className={`${inputClass} ${
                  isDark 
                    ? 'bg-darkmode/50 text-gray cursor-not-allowed' 
                    : 'bg-section/50 text-gray cursor-not-allowed'
                }`}
              />
              <FiMail className={`absolute right-4 top-3.5 h-4 w-4 text-gray`} />
            </div>
            <p className={`text-xs text-gray mt-1`}>
              Email cannot be changed. Contact support for assistance.
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2 border-t ${isDark ? 'border-dark_border' : 'border-border'}">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSavingInfo}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl disabled:opacity-50 text-white font-medium transition shadow-md hover:shadow-lg ${
                isDark
                  ? 'bg-gradient-to-r from-primary to-skyBlue hover:from-skyBlue hover:to-primary'
                  : 'bg-gradient-to-r from-primary to-skyBlue hover:from-skyBlue hover:to-primary'
              }`}
            >
              <FiSave className="h-4 w-4" />
              {isSavingInfo ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </form>
      </div>

      {/* Crop Modal */}
      {showCropModal && cropImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl p-6 shadow-2xl max-w-md w-full ${
              isDark ? 'bg-semidark' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-midnight_text'}`}>
                Crop Profile Photo
              </h3>
              <button
                onClick={() => setShowCropModal(false)}
                className={`p-1 rounded-lg transition ${isDark ? 'hover:bg-darklight' : 'hover:bg-light'}`}
              >
                <FiX className={`h-5 w-5 ${isDark ? 'text-gray' : 'text-gray'}`} />
              </button>
            </div>

            <div className="flex justify-center">
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
            </div>

            <div className="mt-4 space-y-2">
              <label className={`text-xs font-medium ${isDark ? 'text-gray' : 'text-midnight_text'}`}>
                Zoom
              </label>
              <input
                type="range"
                min="1"
                max="2"
                step="0.01"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-primary/20 accent-primary"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCropModal(false)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isDark
                    ? 'text-gray hover:bg-darklight'
                    : 'text-gray hover:bg-light'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCrop}
                className={`px-4 py-2 text-white rounded-lg font-medium transition shadow-md hover:shadow-lg ${
                  isDark
                    ? 'bg-gradient-to-r from-primary to-skyBlue hover:from-skyBlue hover:to-primary'
                    : 'bg-gradient-to-r from-primary to-skyBlue hover:from-skyBlue hover:to-primary'
                }`}
              >
                Apply Crop
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProfileTab;