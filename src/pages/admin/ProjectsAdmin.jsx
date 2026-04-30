import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Images, Upload, Link } from 'lucide-react'
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
  { value: 'amc',         label: 'AMC'         },
]

const CATEGORY_BADGE = {
  residential: 'bg-blue-100 text-blue-700',
  commercial:  'bg-purple-100 text-purple-700',
  builder:     'bg-green-100 text-green-700',
  amc:         'bg-amber-100 text-amber-700',
}

export default function ProjectsAdmin() {
  const { data: projects = [], isLoading } = useProjects({ adminAll: true })
  const create = useCreateProject()
  const update = useUpdateProject()
  const remove = useDeleteProject()

  const [modalOpen,  setModalOpen]  = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteId,   setDeleteId]   = useState(null)
  const [urlMode,    setUrlMode]    = useState(true)
  const [uploading,  setUploading]  = useState(false)
  const fileRef = useRef(null)

  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm()
  const imageUrl = watch('image_url')

  const openCreate = () => {
    setEditTarget(null)
    reset({ title: '', description: '', category: 'residential', image_url: '', video_url: '', is_active: true })
    setModalOpen(true)
  }

  const openEdit = (p) => {
    setEditTarget(p)
    reset({
      title: p.title, description: p.description || '', category: p.category,
      image_url: p.image_url || '', video_url: p.video_url || '', is_active: p.is_active,
    })
    setModalOpen(true)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) { toast.error('File must be under 10MB'); return }

    setUploading(true)
    try {
      const { uploadToImageKit } = await import('../../utils/imagekit')
      const result = await uploadToImageKit(file)
      setValue('image_url', result.url)
      toast.success('Image uploaded!')
    } catch (err) {
      toast.error(`Upload failed: ${err.message}. Paste an image URL instead.`)
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Gallery</h1>
          <p className="text-gray-500 text-sm mt-1">{projects.length} projects uploaded</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center py-16"><LoadingSpinner /></div>
      ) : projects.length === 0 ? (
        <div className="admin-card text-center py-16 text-gray-400">
          <Images size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No projects yet</p>
          <p className="text-sm mt-1">Upload your first project photo</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="admin-card p-0 overflow-hidden group">
              {/* Thumbnail */}
              <div className="aspect-video bg-gray-100 relative">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Images size={28} className="text-gray-300" />
                  </div>
                )}
                {!p.is_active && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xs font-medium px-2 py-1 bg-black/60 rounded">Hidden</span>
                  </div>
                )}
              </div>

              <div className="p-3">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="font-medium text-gray-900 text-sm line-clamp-1">{p.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0 capitalize ${CATEGORY_BADGE[p.category] || 'bg-gray-100 text-gray-600'}`}>
                    {p.category}
                  </span>
                </div>
                {p.description && (
                  <p className="text-gray-400 text-xs line-clamp-1 mb-2">{p.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <button onClick={() => toggleActive(p)} className="flex items-center gap-1 text-xs">
                    {p.is_active
                      ? <><ToggleRight size={16} className="text-green-500"/><span className="text-green-600">Visible</span></>
                      : <><ToggleLeft  size={16} className="text-gray-400"/><span className="text-gray-400">Hidden</span></>
                    }
                  </button>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Project' : 'Add Project'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Project Title *</label>
              <input className="input" placeholder="Modern home wiring — Borivali" {...register('title', { required: 'Title is required' })} />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="label">Category *</label>
              <select className="input bg-white" {...register('category', { required: true })}>
                {CATEGORIES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Description (optional)</label>
            <input className="input" placeholder="Brief description of the project" {...register('description')} />
          </div>

          {/* Image input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="label mb-0">Image</label>
              <div className="flex rounded-lg overflow-hidden border border-gray-200 text-xs">
                <button type="button" onClick={() => setUrlMode(true)}
                  className={`px-3 py-1 ${urlMode ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                  URL
                </button>
                <button type="button" onClick={() => setUrlMode(false)}
                  className={`px-3 py-1 ${!urlMode ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                  Upload
                </button>
              </div>
            </div>

            {urlMode ? (
              <div className="flex gap-2">
                <input className="input" placeholder="https://ik.imagekit.io/..." {...register('image_url')} />
                <button type="button" onClick={() => setUrlMode(false)} className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Upload size={16} className="text-gray-500" />
                </button>
              </div>
            ) : (
              <div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center gap-2 hover:border-amber-400 hover:bg-amber-50/30 transition-all"
                >
                  {uploading ? <LoadingSpinner size="sm" /> : <Upload size={22} className="text-gray-400" />}
                  <span className="text-sm text-gray-500">{uploading ? 'Uploading…' : 'Click to upload image'}</span>
                  <span className="text-xs text-gray-400">PNG, JPG, WEBP — max 10MB</span>
                </button>
                {imageUrl && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <Link size={12} />
                    <span className="truncate">{imageUrl}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="label">Video URL (optional)</label>
            <input className="input" placeholder="https://ik.imagekit.io/... (video file URL)" {...register('video_url')} />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="proj_active" {...register('is_active')} className="w-4 h-4 accent-amber-500" />
            <label htmlFor="proj_active" className="text-sm text-gray-700 cursor-pointer">Show in gallery</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 btn-primary justify-center">
              {isSubmitting ? 'Saving…' : editTarget ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await remove.mutateAsync(deleteId); setDeleteId(null) }}
        loading={remove.isPending}
        title="Delete Project"
        message="This project will be removed from the gallery permanently."
      />
    </div>
  )
}
