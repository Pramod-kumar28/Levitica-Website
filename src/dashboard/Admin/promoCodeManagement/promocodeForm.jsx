import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSave } from "react-icons/fi";
import { useTheme } from '@/context/ThemeContext';
import {
  useCreatePromoMutation,
  useUpdatePromoMutation,
} from '@/Services/admin/promocodeServices';

const PromoModal = ({ onSuccess, mode = "add", promo = {} }) => {
  const isEdit = mode === "edit";
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [createPromo, { isLoading: creating }] = useCreatePromoMutation();
  const [updatePromo, { isLoading: updating }] = useUpdatePromoMutation();

  const isLoading = creating || updating;

  const initialValues = isEdit
    ? {
        id: promo._id,
        code: promo.code ?? "",
        discountType: promo.discountType ?? "percentage",
        discountValue: promo.discountValue ?? "",
        maxDiscount: promo.maxDiscount ?? "",
        minPurchase: promo.minPurchase ?? 1000,
        expiryDate: promo.expiryDate?.slice(0, 10) ?? "",
        usageLimit: promo.usageLimit ?? "",
        influencerName: promo.influencerName ?? "",
        influencerEmail: promo.influencerEmail ?? "",
        influencerPhone: promo.influencerPhone ?? "",
      }
    : {
        code: "",
        discountType: "percentage",
        discountValue: "",
        maxDiscount: "",
        minPurchase: 1000,
        expiryDate: "",
        usageLimit: "",
        influencerName: "",
        influencerEmail: "",
        influencerPhone: "",
      };

  const onSubmitFn = async (values) => {
    if (isEdit) await updatePromo(values);
    else await createPromo(values);
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Promo code is required"),
    discountType: Yup.string().required(),
    discountValue: Yup.number().required("Required"),
    minPurchase: Yup.number().required(),
    expiryDate: Yup.date().required("Required"),
    influencerName: Yup.string().required("Required"),
    influencerEmail: Yup.string().email().required("Required"),
    influencerPhone: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number")
      .required("Required"),
  });

  const inputClass =
    isDark
      ? "w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark-input"
      : "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 p-4">
        <motion.div className={`w-full max-w-2xl rounded-xl shadow-xl transition-colors ${
          isDark
            ? 'bg-slate-800 border border-slate-700'
            : 'bg-white'
        }`}>

          {/* HEADER */}
          <div className={`flex justify-between items-center border-b p-5 transition-colors ${
            isDark
              ? 'border-slate-700'
              : 'border-slate-200'
          }`}>
            <div>
              <h2 className={`text-lg font-semibold transition-colors ${
                isDark
                  ? 'text-slate-100'
                  : 'text-slate-900'
              }`}>
                {isEdit ? "Edit Promo Code" : "Create Promo Code"}
              </h2>
              <p className={`text-sm transition-colors ${
                isDark
                  ? 'text-slate-400'
                  : 'text-gray-500'
              }`}>
                Configure discount and influencer tracking
              </p>
            </div>
            <FiX className={`cursor-pointer transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`} onClick={onSuccess} />
          </div>

          {/* FORM */}
          <div className={`p-6 max-h-[75vh] overflow-y-auto transition-colors ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                await onSubmitFn(values);
                onSuccess();
              }}
            >
              {({ values }) => (
                <Form className="space-y-8">

                  {/* PROMO CODE */}
                  <div>
                    <label className={`text-sm font-medium transition-colors ${
                      isDark
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}>
                      Promo Code
                    </label>
                    <Field
                      name="code"
                      placeholder="e.g. SAMEER50"
                      className={`${inputClass} uppercase font-semibold`}
                    />
                    <p className={`text-xs transition-colors ${
                      isDark
                        ? 'text-slate-400'
                        : 'text-gray-400'
                    }`}>
                      Example: SAMEER50, NEWUSER20
                    </p>
                    <ErrorMessage name="code" component="p" className={`text-xs ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                  </div>

                  {/* BASIC */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={`text-sm font-medium transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-slate-700'
                      }`}>Expiry Date</label>
                      <Field 
                        type="date" 
                        name="expiryDate" 
                        className={`${inputClass} ${isDark ? 'dark-input' : ''}`}
                      />
                    </div>

                    <div>
                      <label className={`text-sm font-medium transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-slate-700'
                      }`}>Usage Limit</label>
                      <Field
                        type="number"
                        name="usageLimit"
                        placeholder="e.g. 100 users"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* DISCOUNT */}
                  <div className={`border-t pt-5 transition-colors ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    <h3 className={`text-sm font-semibold mb-4 transition-colors ${
                      isDark
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}>
                      Discount Settings
                    </h3>

                    <div className="grid md:grid-cols-3 gap-5">
                      <div>
                        <label className={`text-sm font-medium transition-colors ${
                          isDark
                            ? 'text-slate-300'
                            : 'text-slate-700'
                        }`}>Type</label>
                        <Field as="select" name="discountType" className={inputClass}>
                          <option value="percentage">Percentage (%)</option>
                          <option value="flat">Flat (₹)</option>
                        </Field>
                      </div>

                      <div>
                        <label className={`text-sm font-medium transition-colors ${
                          isDark
                            ? 'text-slate-300'
                            : 'text-slate-700'
                        }`}>
                          Value ({values.discountType === "percentage" ? "%" : "₹"})
                        </label>
                        <Field
                          type="number"
                          name="discountValue"
                          placeholder="e.g. 20 or 500"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={`text-sm font-medium transition-colors ${
                          isDark
                            ? 'text-slate-300'
                            : 'text-slate-700'
                        }`}>Max Discount</label>
                        <Field
                          type="number"
                          name="maxDiscount"
                          placeholder="optional"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <p className={`text-xs mt-2 transition-colors ${
                      isDark
                        ? 'text-slate-400'
                        : 'text-gray-400'
                    }`}>
                      Example: 20% or ₹500 discount
                    </p>
                  </div>

                  {/* RULES */}
                  <div className={`border-t pt-5 transition-colors ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    <h3 className={`text-sm font-semibold mb-4 transition-colors ${
                      isDark
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}>
                      Usage Rules
                    </h3>

                    <div>
                      <label className={`text-sm font-medium transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-slate-700'
                      }`}>Minimum Purchase (₹)</label>
                      <Field type="number" name="minPurchase" className={inputClass} />
                      <p className={`text-xs transition-colors ${
                        isDark
                          ? 'text-slate-400'
                          : 'text-gray-400'
                      }`}>
                        Default ₹1000 (promo won’t apply below this)
                      </p>
                    </div>
                  </div>

                  {/* INFLUENCER */}
                  <div className={`border-t pt-5 transition-colors ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    <h3 className={`text-sm font-semibold mb-4 transition-colors ${
                      isDark
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}>
                      Influencer Details
                    </h3>

                    <div className="grid md:grid-cols-3 gap-5">
                      <div>
                        <label className={`text-sm font-medium transition-colors ${
                          isDark
                            ? 'text-slate-300'
                            : 'text-slate-700'
                        }`}>Name</label>
                        <Field name="influencerName" className={inputClass} />
                      </div>

                      <div>
                        <label className={`text-sm font-medium transition-colors ${
                          isDark
                            ? 'text-slate-300'
                            : 'text-slate-700'
                        }`}>Email</label>
                        <Field name="influencerEmail" className={inputClass} />
                      </div>

                      <div>
                        <label className={`text-sm font-medium transition-colors ${
                          isDark
                            ? 'text-slate-300'
                            : 'text-slate-700'
                        }`}>Mobile</label>
                        <Field name="influencerPhone" className={inputClass} />
                      </div>
                    </div>

                    <p className={`text-xs mt-2 transition-colors ${
                      isDark
                        ? 'text-slate-400'
                        : 'text-gray-400'
                    }`}>
                      Used to track influencer performance
                    </p>
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all font-medium ${
                      isDark
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-700/50'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-600/50'
                    }`}
                  >
                    <FiSave />
                    {isLoading ? "Saving..." : isEdit ? "Update Promo" : "Create Promo"}
                  </button>

                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PromoModal;