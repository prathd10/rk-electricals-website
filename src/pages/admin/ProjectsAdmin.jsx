import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Images, Upload, Link, Eye, Play } from 'lucide-react'
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from '../../hooks/useProjects'
import Modal          from '../../components/ui/Modal'
import ConfirmDialog  from '../../components/ui/ConfirmDialog'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import toast          from 'react-hot-toast'

const CATEGORIES = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial',  label: 'Commercial'  },
  { value: 'builder',     label: 'Builder'     },
  { value: 'designer',    label: 'Designer'    },
]

const CATEGORY_BADGE = {
  residential: 'bg-blue-50 text-blue-700 border-blue-100/50 border',
  commercial:  'bg-forest-50 text-forest-800 border-forest-100 border',
  builder:     'bg-pastelBrown-50 text-pastelBrown-800 border-pastelBrown-200/50 border',
  designer:    'bg-purple-50 text-purple-700 border-purple-100 border',
}

export default function ProjectsAdmin() {
  const { data: projects = [], isLoading } = useProjects({ adminAll: true })
  const create = useCreateProject()
  const update = useUpdateProject()
  const remove = useDeleteProject()

  const [modalOpen,  setModalOpen]  = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteId,   setDeleteId]   = useState(null)
  const [urlMode,    setUrlMode]    = useState(false) // Default to Upload mode (more user-friendly!)
  const [mediaType,  setMediaType]  = useState('image') // 'image' or 'video'
  const [uploading,  setUploading]  = useState(false)
  const fileRef = useRef(null)

  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm()
  const imageUrl = watch('image_url')
  const videoUrl = watch('video_url')

  const openCreate = () => {
    setEditTarget(null)
    setMediaType('image')
    setUrlMode(false)
    reset({ title: '', description: '', category: 'residential', image_url: '', video_url: '', is_active: true })
    setModalOpen(true)
  }

  const openEdit = (p) => {
    setEditTarget(p)
    setMediaType(p.video_url ? 'video' : 'image')
    setUrlMode(false)
    reset({
      title: p.title, description: p.description || '', category: p.category,
      image_url: p.image_url || '', video_url: p.video_url || '', is_active: p.is_active,
    })
    setModalOpen(true)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isVideo = file.type.startsWith('video')
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024 // 50MB for video, 10MB for image
    const limitLabel = isVideo ? '50MB' : '10MB'

    if (file.size > maxSize) {
      toast.error(`File must be under ${limitLabel}`)
      return
    }

    setUploading(true)
    try {
      const { uploadToImageKit } = await import('../../utils/imagekit')
      const result = await uploadToImageKit(file)
      
      if (isVideo) {
        setValue('video_url', result.url)
        // Auto-generate high-quality video thumbnail using ImageKit's dynamic ik-thumbnail engine
        setValue('image_url', result.url + '/ik-thumbnail.jpg')
        toast.success('Video file uploaded to ImageKit!')
      } else {
        setValue('image_url', result.url)
        setValue('video_url', '')
        toast.success('Image file uploaded to ImageKit!')
      }
    } catch (err) {
      toast.error(`Upload failed: ${err.message}. Paste a direct URL instead.`)
      setUrlMode(true)
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data) => {
    const payload = { ...data, is_active: data.is_active === true || data.is_active === 'true' }
    if (editTarget) await update.mutateAsync({ id: editTarget.id, ...payload })
    else await create.mutateAsync(payload)
    setModalOpen(false)
    reset()
  }

  const toggleActive = (p) => update.mutateAsync({ id: p.id, is_active: !p.is_active })

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-forest-800/5 pb-6 gap-4">
        <div>
          <h1 className="font-serif text-3xl text-forest-800 tracking-wide">Project Gallery</h1>
          <p className="text-forest-800/40 text-[10px] font-sans font-bold uppercase tracking-widest mt-2">
            {projects.length} files currently managed inside gallery
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} />
          Add Photo / Video
        </button>
      </div>

      {/* ================= GALLERY LIST GRID ================= */}
      {isLoading ? (
        <div className="flex justify-center py-20"><LoadingSpinner /></div>
      ) : projects.length === 0 ? (
        <div className="admin-card text-center py-20 text-forest-800/40 border border-dashed border-forest-800/10">
          <Images size={40} className="mx-auto mb-4 opacity-30 text-forest-600" />
          <p className="font-sans font-bold uppercase tracking-widest text-[11px]">No gallery media yet</p>
          <p className="text-xs text-forest-800/30 mt-1">Upload your first photo or video above</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="admin-card p-0 overflow-hidden group hover:shadow-lg transition-all duration-300">
              
              {/* Image / Video Thumbnail wrapper */}
              <div className="aspect-square bg-[#FAF8F5] relative overflow-hidden border-b border-forest-800/5">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Images size={28} className="text-forest-100" />
                  </div>
                )}

                {/* Elegant Play icon overlay for videos */}
                {p.video_url && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-forest-800">
                      <Play size={18} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                )}

                {!p.is_active && (
                  <div className="absolute inset-0 bg-forest-900/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="text-white text-[9px] font-sans font-bold uppercase tracking-widest px-3 py-1 bg-black/40 rounded-full border border-white/10">
                      Hidden
                    </span>
                  </div>
                )}
              </div>

              {/* Text detail section */}
              <div className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-sans font-extrabold text-forest-800 text-sm truncate" title={p.title}>
                      {p.title}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider capitalize ${CATEGORY_BADGE[p.category] || 'bg-gray-100 text-gray-600'}`}>
                      {p.category}
                    </span>
                  </div>
                  {p.description && (
                    <p className="text-forest-800/40 text-xs truncate pl-0.5">{p.description}</p>
                  )}
                </div>

                {/* Operations Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-forest-800/5 pl-0.5">
                  <button onClick={() => toggleActive(p)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300">
                    {p.is_active ? (
                      <><ToggleRight size={18} className="text-forest-800" /><span className="text-forest-800">Visible</span></>
                    ) : (
                      <><ToggleLeft  size={18} className="text-forest-800/30" /><span className="text-forest-800/30">Hidden</span></>
                    )}
                  </button>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEdit(p)} 
                      className="p-2 rounded-xl text-forest-800/50 hover:text-forest-800 hover:bg-[#FAF8F5] border border-transparent hover:border-forest-800/5 transition-all duration-300 shadow-none hover:shadow-sm"
                    >
                      <Pencil size={13} />
                    </button>
                    <button 
                      onClick={() => setDeleteId(p.id)} 
                      className="p-2 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-300 shadow-none hover:shadow-sm"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ================= ADD/EDIT MEDIA MODAL ================= */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Gallery Media' : 'Add Gallery Media'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Name / Title & Category */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="label">Name / Title *</label>
              <input 
                className="input" 
                placeholder="Name (e.g. Master Bedroom Lighting)" 
                {...register('title', { required: 'Name is required' })} 
              />
              {errors.title && <p className="text-burnt-500 text-xs mt-1 font-sans pl-0.5">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="label">Category *</label>
              <select className="input bg-white cursor-pointer" {...register('category', { required: true })}>
                {CATEGORIES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="label">Description (optional)</label>
            <input className="input" placeholder="Brief details about the technical layout" {...register('description')} />
          </div>

          {/* Media Type Selection Toggle */}
          <div className="space-y-2">
            <label className="label">Media Type</label>
            <div className="flex gap-3">
              {['image', 'video'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setMediaType(type)
                    setValue('image_url', '')
                    setValue('video_url', '')
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                    mediaType === type 
                      ? 'bg-forest-800 text-white border-forest-800 shadow-sm' 
                      : 'bg-white text-forest-800 border-forest-800/10 hover:bg-[#FAF8F5]'
                  }`}
                >
                  {type === 'image' ? 'Photo' : 'Video File'}
                </button>
              ))}
            </div>
          </div>

          {/* Upload and URL Mode toggler */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-1">
              <label className="label mb-0 capitalize">{mediaType} File</label>
              <div className="flex rounded-lg overflow-hidden border border-forest-800/10 text-[10px] font-bold uppercase tracking-widest bg-white">
                <button 
                  type="button" 
                  onClick={() => setUrlMode(false)}
                  className={`px-3 py-1.5 transition-colors ${!urlMode ? 'bg-forest-800 text-white' : 'text-forest-800/50 hover:bg-[#FAF8F5]'}`}
                >
                  Upload File
                </button>
                <button 
                  type="button" 
                  onClick={() => setUrlMode(true)}
                  className={`px-3 py-1.5 transition-colors ${urlMode ? 'bg-forest-800 text-white' : 'text-forest-800/50 hover:bg-[#FAF8F5]'}`}
                >
                  Paste URL
                </button>
              </div>
            </div>

            {urlMode ? (
              <div className="space-y-3">
                {mediaType === 'image' ? (
                  <div className="flex gap-2">
                    <input className="input" placeholder="https://ik.imagekit.io/your_id/image.jpg" {...register('image_url')} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input className="input" placeholder="https://ik.imagekit.io/your_id/video.mp4 (direct video file URL)" {...register('video_url')} />
                    <input className="input" placeholder="https://ik.imagekit.io/your_id/thumbnail.jpg (optional poster thumbnail URL)" {...register('image_url')} />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <input 
                  ref={fileRef} 
                  type="file" 
                  accept={mediaType === 'image' ? 'image/*' : 'video/*'} 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />
                
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-2 border-dashed border-forest-800/10 hover:border-pastelBrown-500 rounded-2xl p-8 flex flex-col items-center gap-3 hover:bg-[#FAF8F5] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Upload size={24} className="text-forest-800/30" />
                  )}
                  <span className="text-xs font-bold uppercase tracking-widest text-forest-800/60">
                    {uploading ? 'Processing & Uploading to ImageKit…' : `Click to choose ${mediaType} file`}
                  </span>
                  <span className="text-[10px] text-forest-800/40 font-medium">
                    {mediaType === 'image' ? 'PNG, JPG, WEBP — max 10MB' : 'MP4, WEBM, MOV — max 50MB'}
                  </span>
                </button>

                {/* Output indicator */}
                {(imageUrl || videoUrl) && (
                  <div className="mt-3 flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-wider text-forest-800/40 pl-0.5 max-w-full">
                    <Link size={12} className="text-forest-600 flex-shrink-0" />
                    <span className="truncate">{mediaType === 'video' ? videoUrl : imageUrl}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center gap-3 bg-[#FAF8F5] p-4 rounded-xl border border-forest-800/5">
            <input 
              type="checkbox" 
              id="proj_active" 
              {...register('is_active')} 
              className="w-4 h-4 rounded text-forest-800 focus:ring-forest-800 accent-forest-800 cursor-pointer" 
            />
            <label htmlFor="proj_active" className="text-xs font-bold uppercase tracking-widest text-forest-800/70 cursor-pointer select-none">
              Publish & Show in Gallery Immediately
            </label>
          </div>

          {/* Buttons Row */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setModalOpen(false)} 
              className="flex-1 btn-secondary justify-center py-3.5"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || uploading} 
              className="flex-1 btn-primary justify-center py-3.5"
            >
              {isSubmitting ? 'Saving…' : editTarget ? 'Save Changes' : 'Add to Gallery'}
            </button>
          </div>

        </form>
      </Modal>

      {/* Delete confirm dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await remove.mutateAsync(deleteId); setDeleteId(null) }}
        loading={remove.isPending}
        title="Delete Project"
        message="This media asset will be removed from the gallery permanently."
      />

    </div>
  )
}
