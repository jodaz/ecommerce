import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { 
  UploadCloudIcon, 
  FacebookIcon, 
  InstagramIcon, 
  TwitterIcon,
  TikTokIcon,
  PencilIcon,
  CheckIcon,
  XIcon
} from '@/components/core/icons';
import { Loader2 } from 'lucide-react';

interface BusinessProfileFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  previewUrl: string | null;
  onLogoClick: () => void;
  fileInputRef: any;
  onLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  isSubmitting: boolean;
  onEdit: () => void;
  onCancel: () => void;
  businessData: any;
  settingsData: any;
}

export default function BusinessProfileForm({
  register,
  errors,
  previewUrl,
  onLogoClick,
  fileInputRef,
  onLogoChange,
  isEditing,
  isSubmitting,
  onEdit,
  onCancel,
  businessData,
  settingsData
}: BusinessProfileFormProps) {
  return (
    <div className="bg-white border border-zinc-200 p-6 md:p-8 space-y-8 relative overflow-hidden">
      {!isEditing && (
        <div className="absolute top-6 right-6 z-10">
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
          >
            <PencilIcon className="w-3 h-3" />
            Editar Perfil
          </button>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight border-b border-zinc-200 pb-2">Perfil del Negocio</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Logo Section */}
          <div className="w-full md:w-1/3 space-y-4 text-center md:text-left">
            <label className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Logo
            </label>
            <div 
              onClick={isEditing ? onLogoClick : undefined}
              className={`aspect-square w-full max-w-[200px] mx-auto md:mx-0 border-2 ${isEditing ? 'border-dashed border-zinc-200 cursor-pointer hover:border-black' : 'border-zinc-100'} flex flex-col items-center justify-center gap-3 transition-colors bg-zinc-50 group relative overflow-hidden`}
            >
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Logo" className="w-full h-full object-contain p-4" />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest">
                      Cambiar Logo
                    </div>
                  )}
                </>
              ) : (
                <>
                  <UploadCloudIcon className="w-8 h-8 text-zinc-400" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Sin Logo</span>
                </>
              )}
            </div>
            {isEditing && (
              <>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={onLogoChange}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">SVG o PNG 512x512px</p>
              </>
            )}
          </div>

          <div className="flex-1 w-full space-y-6">
            {/* Info Fields */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
                  Nombre de la Empresa
                </label>
                {isEditing ? (
                  <input
                    {...register('companyName')}
                    className={`w-full h-11 px-4 border ${errors.companyName ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none font-medium`}
                  />
                ) : (
                  <p className="text-lg font-bold">{businessData?.name || 'No configurado'}</p>
                )}
                {errors.companyName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.companyName.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
                  Teléfono (WhatsApp)
                </label>
                {isEditing ? (
                  <input
                    {...register('phone')}
                    placeholder="+58 412 000 0000"
                    className={`w-full h-11 px-4 border ${errors.phone ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none font-medium`}
                  />
                ) : (
                  <p className="font-semibold text-zinc-600">{settingsData?.phone || 'No configurado'}</p>
                )}
                {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.phone.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
                  Descripción
                </label>
                {isEditing ? (
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full p-4 border border-zinc-200 focus:outline-none focus:border-black transition-colors rounded-none resize-none font-medium text-sm"
                  />
                ) : (
                  <p className="text-sm text-zinc-600 leading-relaxed">{settingsData?.description || 'Sin descripción'}</p>
                )}
              </div>
            </div>

            {/* Social Media Section */}
            <div className="space-y-4 pt-6 border-t border-zinc-100">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Redes Sociales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Instagram */}
                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    <InstagramIcon className="w-3 h-3" /> Instagram
                  </span>
                  {isEditing ? (
                    <input
                      {...register('instagram')}
                      className={`w-full h-10 px-3 text-xs border ${errors.instagram ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
                      placeholder="https://instagram.com/tu-marca"
                    />
                  ) : (
                    <p className="text-xs font-medium truncate">{settingsData?.instagram_url || 'No configurado'}</p>
                  )}
                  {errors.instagram && <p className="text-red-500 text-[8px] font-bold uppercase tracking-widest">{errors.instagram.message as string}</p>}
                </div>

                {/* Facebook */}
                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    <FacebookIcon className="w-3 h-3" /> Facebook
                  </span>
                  {isEditing ? (
                    <input
                      {...register('facebook')}
                      className={`w-full h-10 px-3 text-xs border ${errors.facebook ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
                      placeholder="https://facebook.com/tu-marca"
                    />
                  ) : (
                    <p className="text-xs font-medium truncate">{settingsData?.facebook_url || 'No configurado'}</p>
                  )}
                  {errors.facebook && <p className="text-red-500 text-[8px] font-bold uppercase tracking-widest">{errors.facebook.message as string}</p>}
                </div>

                {/* TikTok */}
                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    TikTok
                  </span>
                  {isEditing ? (
                    <input
                      {...register('tiktok')}
                      className={`w-full h-10 px-3 text-xs border ${errors.tiktok ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
                      placeholder="https://tiktok.com/@tu-marca"
                    />
                  ) : (
                    <p className="text-xs font-medium truncate">{settingsData?.tiktok_url || 'No configurado'}</p>
                  )}
                  {errors.tiktok && <p className="text-red-500 text-[8px] font-bold uppercase tracking-widest">{errors.tiktok.message as string}</p>}
                </div>

                {/* Twitter/X */}
                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    <TwitterIcon className="w-3 h-3" /> X (Twitter)
                  </span>
                  {isEditing ? (
                    <input
                      {...register('twitter')}
                      className={`w-full h-10 px-3 text-xs border ${errors.twitter ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
                      placeholder="https://x.com/tu-marca"
                    />
                  ) : (
                    <p className="text-xs font-medium truncate">{settingsData?.twitter_url || 'No configurado'}</p>
                  )}
                  {errors.twitter && <p className="text-red-500 text-[8px] font-bold uppercase tracking-widest">{errors.twitter.message as string}</p>}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="pt-8 flex flex-col sm:flex-row justify-end gap-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest border border-zinc-200 hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
                >
                  <XIcon className="w-3 h-3" />
                  CANCELAR
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 text-[10px] font-bold uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-w-[160px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      GUARDANDO...
                    </>
                  ) : (
                    <>
                      <CheckIcon className="w-3 h-3" />
                      GUARDAR CAMBIOS
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
