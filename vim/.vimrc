" Use Vim settings rather than vi
set nocompatible

" Make searches case-sensitive only if they contain upper-case characters
set ignorecase
set smartcase
set nobackup
set noswapfile

if has ("gui_running")
    set relativenumber
    set undofile
    set undodir=~/.vim/undos
    set colorcolumn=81
endif

" Window movement
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" color scheme of the moment:
filetype plugin on
syntax on
colorscheme blackboard
let python_highlight_all = 1

" Set the font
"set guifont=Monaco:h14
set guifont=Menlo:h13

" Line numbers
set number
nnoremap <F2> :set nonumber!<CR>:set foldcolumn=0<CR>

" Indentation
filetype plugin indent on
set expandtab
set tabstop=4
set shiftwidth=4
set softtabstop=4
" Set smart indent
set laststatus=2
set showmatch
set incsearch
set scrolloff=3
set ruler

let mapleader=","
nnoremap <silent> <Leader>r :set relativenumber<CR>
nnoremap <silent> <Leader>n :set number<CR>

" NERDTree
nmap <silent> <D-d> :NERDTreeToggle<CR>
nnoremap <silent> <Leader>d :NERDTreeToggle<CR>
nmap <silent> <D-D> :NERDTree<CR>

" Python syntax highlighting
" autocmd FileType python set complete+=k~/.vim/syntax/python.vim isk+=.,(
" autocmd FileType python set omnifunc=pythoncomplete#Complete

"if exists("did_load_filetypes")
"    finish
"endif

" Hide the toolbar in gui mode
set go-=T

" Mako syntax highlighting
au BufNewFile,BufRead *.mako set syntax=mako
au BufNewFile,BufRead *.mak set syntax=mako

" Creole syntax highlighting
au BufNewFile,BufRead *.wiki set syntax=creole

" status line
set statusline=%f%m%r%h%w\ L%l/%L\ C%v
