import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { settings } from '../../../services/api';

const SettingsManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: ''
    },
    footer: {
      copyrightText: '',
      quickLinks: []
    },
    seo: {
      metaDescription: '',
      metaKeywords: ''
    },
    appearance: {
      primaryColor: '',
      secondaryColor: ''
    }
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settings.get();
      const data = response.data.data;
      setFormData(data);
      setLogoPreview(data.appearance?.logo);
      setFaviconPreview(data.appearance?.favicon);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') {
          setLogoPreview(reader.result);
          setFormData(prev => ({
            ...prev,
            logo: file
          }));
        } else {
          setFaviconPreview(reader.result);
          setFormData(prev => ({
            ...prev,
            favicon: file
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'socialMedia' || key === 'footer' || key === 'seo' || key === 'appearance') {
          data.append(key, JSON.stringify(formData[key]));
        } else if (key === 'logo' || key === 'favicon') {
          if (formData[key] instanceof File) {
            data.append(key, formData[key]);
          }
        } else {
          data.append(key, formData[key]);
        }
      });

      await settings.update(data);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <p className="text-gray-600 mt-1">Manage your website settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <input
                type="text"
                name="siteDescription"
                value={formData.siteDescription}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(formData.socialMedia).map(platform => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <i className={`ri-${platform}-line`}></i>
                  </span>
                  <input
                    type="url"
                    name={platform}
                    value={formData.socialMedia[platform]}
                    onChange={(e) => handleChange(e, 'socialMedia')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">Appearance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo
              </label>
              <div className="space-y-2">
                {logoPreview && (
                  <div className="relative w-48">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setLogoPreview(null);
                        setFormData(prev => ({ ...prev, logo: null }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'logo')}
                  accept="image/*"
                  className="hidden"
                  id="logo"
                />
                <label
                  htmlFor="logo"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <i className="ri-upload-2-line mr-2"></i>
                  {logoPreview ? 'Change Logo' : 'Upload Logo'}
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favicon
              </label>
              <div className="space-y-2">
                {faviconPreview && (
                  <div className="relative w-16">
                    <img
                      src={faviconPreview}
                      alt="Favicon preview"
                      className="w-full h-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFaviconPreview(null);
                        setFormData(prev => ({ ...prev, favicon: null }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <i className="ri-delete-bin-line text-xs"></i>
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'favicon')}
                  accept="image/*"
                  className="hidden"
                  id="favicon"
                />
                <label
                  htmlFor="favicon"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <i className="ri-upload-2-line mr-2"></i>
                  {faviconPreview ? 'Change Favicon' : 'Upload Favicon'}
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <input
                type="color"
                name="primaryColor"
                value={formData.appearance.primaryColor}
                onChange={(e) => handleChange(e, 'appearance')}
                className="h-10 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <input
                type="color"
                name="secondaryColor"
                value={formData.appearance.secondaryColor}
                onChange={(e) => handleChange(e, 'appearance')}
                className="h-10 w-full"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">Footer Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Copyright Text
              </label>
              <input
                type="text"
                name="copyrightText"
                value={formData.footer.copyrightText}
                onChange={(e) => handleChange(e, 'footer')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Links
              </label>
              <div className="space-y-4">
                {formData.footer.quickLinks.map((link, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => {
                          const newLinks = [...formData.footer.quickLinks];
                          newLinks[index].label = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            footer: {
                              ...prev.footer,
                              quickLinks: newLinks
                            }
                          }));
                        }}
                        placeholder="Link Label"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...formData.footer.quickLinks];
                          newLinks[index].url = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            footer: {
                              ...prev.footer,
                              quickLinks: newLinks
                            }
                          }));
                        }}
                        placeholder="Link URL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newLinks = formData.footer.quickLinks.filter((_, i) => i !== index);
                        setFormData(prev => ({
                          ...prev,
                          footer: {
                            ...prev.footer,
                            quickLinks: newLinks
                          }
                        }));
                      }}
                      className="px-2 py-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        quickLinks: [
                          ...prev.footer.quickLinks,
                          { label: '', url: '' }
                        ]
                      }
                    }));
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add Quick Link
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">SEO Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={formData.seo.metaDescription}
                onChange={(e) => handleChange(e, 'seo')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter meta description for SEO"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Keywords
              </label>
              <input
                type="text"
                name="metaKeywords"
                value={formData.seo.metaKeywords}
                onChange={(e) => handleChange(e, 'seo')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter keywords separated by commas"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="ri-save-line"></i>
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default SettingsManager; 