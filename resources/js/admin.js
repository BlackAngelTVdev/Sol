/**
 * Scripts AJAX pour le dashboard admin
 */

// Obtenir le token CSRF depuis le cookie XSRF
function getCsrfToken() {
  // Cherche le cookie XSRF-TOKEN
  const name = 'XSRF-TOKEN='
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(';')
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim()
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }
  
  // Fallback: cherche dans le champ input hidden
  const input = document.querySelector('input[name="_csrf"]')
  return input ? input.value : ''
}

// Mise à jour du statut via AJAX
function initStatusSelect() {
  document.querySelectorAll('.status-select').forEach((select) => {
    select.addEventListener('change', async (e) => {
      const id = e.target.dataset.id
      const status = e.target.value

      try {
        const response = await fetch(`/admin/status/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCsrfToken(),
          },
          body: JSON.stringify({ id, status }),
        })

        if (response.ok) {
          console.log('✓ Statut mis à jour:', status)
          // Recharge la page pour mettre à jour l'affichage
          setTimeout(() => location.reload(), 500)
        } else {
          alert('Erreur lors de la mise à jour du statut')
          console.error('Response status:', response.status)
        }
      } catch (error) {
        console.error('Erreur:', error)
        alert('Erreur lors de la mise à jour du statut')
      }
    })
  })
}

// Toggle visibilité
function initVisibilityBtn() {
  document.querySelectorAll('.visibility-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      const id = btn.dataset.id

      try {
        const response = await fetch(`/admin/visibility/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCsrfToken(),
          },
          body: JSON.stringify({ id }),
        })

        if (response.ok) {
          const data = await response.json()
          btn.innerHTML = data.isVisible ? '<span>👁️ Visible</span>' : '<span>🚫 Caché</span>'
          console.log('✓ Visibilité togglée:', data.isVisible)
        } else {
          alert('Erreur lors de la mise à jour de la visibilité')
        }
      } catch (error) {
        console.error('Erreur:', error)
        alert('Erreur lors de la mise à jour de la visibilité')
      }
    })
  })
}

// Upload d'image
function initFileInput() {
  document.querySelectorAll('.file-input').forEach((input) => {
    input.addEventListener('change', async (e) => {
      const id = e.target.dataset.id
      const file = e.target.files[0]

      if (!file) return

      const formData = new FormData()
      formData.append('image', file)

      try {
        const response = await fetch(`/admin/upload/${id}`, {
          method: 'POST',
          headers: {
            'X-CSRF-Token': getCsrfToken(),
          },
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          console.log('✓ Image uploadée:', data.imagePath)
          // Recharge la page pour afficher la nouvelle image
          setTimeout(() => location.reload(), 500)
        } else {
          const error = await response.json()
          alert('Erreur: ' + error.error)
        }
      } catch (error) {
        console.error('Erreur:', error)
        alert("Erreur lors de l'upload")
      }
    })
  })
}

// Suppression de commande
async function deleteCommand(id) {
  try {
    const response = await fetch(`/admin/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': getCsrfToken(),
      },
    })

    if (response.ok) {
      console.log('✓ Commande supprimée')
      setTimeout(() => location.reload(), 500)
    } else {
      alert('Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de la suppression')
  }
}

// Initialiser tous les scripts au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Admin scripts initialized')
  
  // Debug: afficher le token CSRF
  const token = getCsrfToken()
  console.log('🔐 CSRF Token trouvé:', token ? '✓' : '✗', token ? token.substring(0, 10) + '...' : 'VIDE')
  
  if (!token) {
    console.error('❌ AUCUN TOKEN CSRF TROUVÉ!')
    console.log('Input CSRF:', document.querySelector('input[name="_csrf"]'))
  }
  
  initStatusSelect()
  initVisibilityBtn()
  initFileInput()
})
